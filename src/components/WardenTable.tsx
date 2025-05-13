
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash } from "lucide-react";

// Define the Warden type to match our database schema
interface Warden {
  id: string;
  name: string;
  position: string;
  area: string;
  contact: string;
}

interface WardenTableProps {
  data: Warden[];
  isAdmin: boolean;
  onEdit?: (warden: Warden) => void;
  onDelete?: (id: string) => void;
}

const WardenTable = ({ data, isAdmin, onEdit, onDelete }: WardenTableProps) => {
  const [sortField, setSortField] = useState<keyof Warden>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (field: keyof Warden) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortDirection === "asc" ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <Card className="animate-enter">
      <CardHeader className="bg-gradient-to-r from-warden-light to-warden text-white rounded-t-lg">
        <CardTitle className="flex justify-between items-center">
          Wardens List
          <Badge variant="outline" className="bg-white text-warden">
            {data.length} Records
          </Badge>
        </CardTitle>
        <CardDescription className="text-white/80">
          List of all registered wardens in the system
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted">
              <TableRow>
                <TableHead 
                  className="cursor-pointer hover:text-primary transition-colors"
                  onClick={() => handleSort("name")}
                >
                  Name {sortField === "name" && (sortDirection === "asc" ? "↑" : "↓")}
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:text-primary transition-colors"
                  onClick={() => handleSort("position")}
                >
                  Position {sortField === "position" && (sortDirection === "asc" ? "↑" : "↓")}
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:text-primary transition-colors"
                  onClick={() => handleSort("area")}
                >
                  Area {sortField === "area" && (sortDirection === "asc" ? "↑" : "↓")}
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:text-primary transition-colors"
                  onClick={() => handleSort("contact")}
                >
                  Contact {sortField === "contact" && (sortDirection === "asc" ? "↑" : "↓")}
                </TableHead>
                {isAdmin && <TableHead className="text-right">Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.length > 0 ? (
                sortedData.map((warden) => (
                  <TableRow 
                    key={warden.id}
                    className="hover:bg-muted/50 transition-colors"
                  >
                    <TableCell className="font-medium">{warden.name}</TableCell>
                    <TableCell>{warden.position}</TableCell>
                    <TableCell>{warden.area}</TableCell>
                    <TableCell>{warden.contact}</TableCell>
                    {isAdmin && (
                      <TableCell className="text-right space-x-2">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => onEdit && onEdit(warden)}
                          className="text-warden hover:bg-warden/10"
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => onDelete && onDelete(warden.id)}
                          className="text-destructive hover:bg-destructive/10"
                        >
                          <Trash className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={isAdmin ? 5 : 4} className="text-center py-8 text-muted-foreground">
                    No wardens found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default WardenTable;


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

// Define the Tool type to match our database schema
interface Tool {
  id: string;
  name: string;
  category: string;
  quantity: number;
  location: string;
}

interface ToolsTableProps {
  data: Tool[];
  isAdmin: boolean;
  onEdit?: (tool: Tool) => void;
  onDelete?: (id: string) => void;
}

const ToolsTable = ({ data, isAdmin, onEdit, onDelete }: ToolsTableProps) => {
  const [sortField, setSortField] = useState<keyof Tool>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (field: keyof Tool) => {
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
      <CardHeader className="bg-gradient-to-r from-tools-light to-tools text-white rounded-t-lg">
        <CardTitle className="flex justify-between items-center">
          Tools Inventory
          <Badge variant="outline" className="bg-white text-tools">
            {data.length} Records
          </Badge>
        </CardTitle>
        <CardDescription className="text-white/80">
          List of all tools and equipment in inventory
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted">
              <TableRow>
                <TableHead 
                  className="cursor-pointer hover:text-secondary transition-colors"
                  onClick={() => handleSort("name")}
                >
                  Name {sortField === "name" && (sortDirection === "asc" ? "↑" : "↓")}
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:text-secondary transition-colors"
                  onClick={() => handleSort("category")}
                >
                  Category {sortField === "category" && (sortDirection === "asc" ? "↑" : "↓")}
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:text-secondary transition-colors"
                  onClick={() => handleSort("quantity")}
                >
                  Quantity {sortField === "quantity" && (sortDirection === "asc" ? "↑" : "↓")}
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:text-secondary transition-colors"
                  onClick={() => handleSort("location")}
                >
                  Location {sortField === "location" && (sortDirection === "asc" ? "↑" : "↓")}
                </TableHead>
                {isAdmin && <TableHead className="text-right">Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.length > 0 ? (
                sortedData.map((tool) => (
                  <TableRow 
                    key={tool.id}
                    className="hover:bg-muted/50 transition-colors"
                  >
                    <TableCell className="font-medium">{tool.name}</TableCell>
                    <TableCell>{tool.category}</TableCell>
                    <TableCell>{tool.quantity}</TableCell>
                    <TableCell>{tool.location}</TableCell>
                    {isAdmin && (
                      <TableCell className="text-right space-x-2">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => onEdit && onEdit(tool)}
                          className="text-tools hover:bg-tools/10"
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => onDelete && onDelete(tool.id)}
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
                    No tools found
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

export default ToolsTable;

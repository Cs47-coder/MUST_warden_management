import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import WardenTable from "./WardenTable";
import ToolsTable from "./ToolsTable";
import AdminControls from "./AdminControls";
import { useToast } from "@/components/ui/use-toast";
import axios from 'axios';

// Types for our data
interface Warden {
  id: string;
  name: string;
  position: string;
  area: string;
  contact: string;
}

interface Tool {
  id: string;
  name: string;
  category: string;
  quantity: number;
  location: string;
}

interface DashboardProps {
  isAdmin: boolean;
}

const Dashboard = ({ isAdmin }: DashboardProps) => {
  const [activeTab, setActiveTab] = useState("wardens");
  const [wardens, setWardens] = useState<Warden[]>([]);
  const [tools, setTools] = useState<Tool[]>([]);
  const [isAdminControlOpen, setIsAdminControlOpen] = useState(false);
  const [editingWarden, setEditingWarden] = useState<Warden | null>(null);
  const [editingTool, setEditingTool] = useState<Tool | null>(null);
  const { toast } = useToast();

  // Fetch wardens and tools on mount
  useEffect(() => {
    fetchWardens();
    fetchTools();
  }, []);

  const fetchWardens = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/wardens');
      setWardens(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch wardens",
        variant: "destructive",
      });
    }
  };

  const fetchTools = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tools');
      setTools(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch tools",
        variant: "destructive",
      });
    }
  };

  // Admin control handlers
  const handleAddWarden = async (data: Omit<Warden, "id">) => {
    try {
      const response = await axios.post('http://localhost:5000/api/wardens', data);
      setWardens([...wardens, response.data]);
      toast({
        title: "Success",
        description: "Warden added successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add warden",
        variant: "destructive",
      });
    }
  };

  const handleUpdateWarden = async (id: string, data: Omit<Warden, "id">) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/wardens/${id}`, data);
      setWardens(wardens.map(warden => warden.id === id ? response.data : warden));
      setEditingWarden(null);
      toast({
        title: "Success",
        description: "Warden updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update warden",
        variant: "destructive",
      });
    }
  };

  const handleDeleteWarden = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/wardens/${id}`);
      setWardens(wardens.filter(warden => warden.id !== id));
      toast({
        title: "Success",
        description: "Warden deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete warden",
        variant: "destructive",
      });
    }
  };

  const handleAddTool = async (data: Omit<Tool, "id">) => {
    try {
      const response = await axios.post('http://localhost:5000/api/tools', data);
      setTools([...tools, response.data]);
      toast({
        title: "Success",
        description: "Tool added successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add tool",
        variant: "destructive",
      });
    }
  };

  const handleUpdateTool = async (id: string, data: Omit<Tool, "id">) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/tools/${id}`, data);
      setTools(tools.map(tool => tool.id === id ? response.data : tool));
      setEditingTool(null);
      toast({
        title: "Success",
        description: "Tool updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update tool",
        variant: "destructive",
      });
    }
  };

  const handleDeleteTool = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/tools/${id}`);
      setTools(tools.filter(tool => tool.id !== id));
      toast({
        title: "Success",
        description: "Tool deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete tool",
        variant: "destructive",
      });
    }
  };

  const openAdminControl = () => {
    setEditingWarden(null);
    setEditingTool(null);
    setIsAdminControlOpen(true);
  };

  const handleEditWarden = (warden: Warden) => {
    setEditingWarden(warden);
    setEditingTool(null);
    setIsAdminControlOpen(true);
  };

  const handleEditTool = (tool: Tool) => {
    setEditingTool(tool);
    setEditingWarden(null);
    setIsAdminControlOpen(true);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-warden/10 to-tools/10 border-none shadow-lg animate-enter">
        <CardHeader>
          <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-warden to-tools">
            Warden Management Dashboard
          </CardTitle>
          <CardDescription>
            Manage wardens and tools in the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-md card-hover">
              <h3 className="font-semibold text-warden">Total Wardens</h3>
              <p className="text-3xl font-bold">{wardens.length}</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md card-hover">
              <h3 className="font-semibold text-tools">Total Tools</h3>
              <p className="text-3xl font-bold">{tools.length}</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md card-hover">
              <h3 className="font-semibold text-warden">Areas Covered</h3>
              <p className="text-3xl font-bold">{new Set(wardens.map(w => w.area)).size}</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md card-hover">
              <h3 className="font-semibold text-tools">Tool Categories</h3>
              <p className="text-3xl font-bold">{new Set(tools.map(t => t.category)).size}</p>
            </div>
          </div>
        </CardContent>
        {isAdmin && (
          <CardFooter>
            <Button className="bg-gradient-to-r from-warden to-tools text-white hover:opacity-90" onClick={openAdminControl}>
              <Plus className="mr-2 h-4 w-4" /> Add New Record
            </Button>
          </CardFooter>
        )}
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger 
            value="wardens" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-warden-light data-[state=active]:to-warden data-[state=active]:text-white"
          >
            Wardens
          </TabsTrigger>
          <TabsTrigger 
            value="tools" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-tools-light data-[state=active]:to-tools data-[state=active]:text-white"
          >
            Tools
          </TabsTrigger>
        </TabsList>
        <TabsContent value="wardens" className="animate-enter">
          <WardenTable 
            data={wardens} 
            isAdmin={isAdmin}
            onEdit={handleEditWarden}
            onDelete={handleDeleteWarden}
          />
        </TabsContent>
        <TabsContent value="tools" className="animate-enter">
          <ToolsTable 
            data={tools} 
            isAdmin={isAdmin}
            onEdit={handleEditTool}
            onDelete={handleDeleteTool}
          />
        </TabsContent>
      </Tabs>

      {/* Admin Controls Modal */}
      <AdminControls
        isOpen={isAdminControlOpen}
        onClose={() => {
          setIsAdminControlOpen(false);
          setEditingWarden(null);
          setEditingTool(null);
        }}
        onAddWarden={handleAddWarden}
        onAddTool={handleAddTool}
        onUpdateWarden={handleUpdateWarden}
        onUpdateTool={handleUpdateTool}
        editingWarden={editingWarden}
        editingTool={editingTool}
      />
    </div>
  );
};

export default Dashboard;
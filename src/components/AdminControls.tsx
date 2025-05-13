
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Sheet, 
  SheetClose, 
  SheetContent, 
  SheetDescription, 
  SheetFooter, 
  SheetHeader, 
  SheetTitle 
} from "@/components/ui/sheet";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

// Types for our forms
interface WardenFormData {
  id?: string;
  name: string;
  position: string;
  area: string;
  contact: string;
}

interface ToolFormData {
  id?: string;
  name: string;
  category: string;
  quantity: number;
  location: string;
}

interface AdminControlsProps {
  isOpen: boolean;
  onClose: () => void;
  onAddWarden: (data: WardenFormData) => void;
  onAddTool: (data: ToolFormData) => void;
  onUpdateWarden?: (id: string, data: WardenFormData) => void;
  onUpdateTool?: (id: string, data: ToolFormData) => void;
  editingWarden?: WardenFormData | null;
  editingTool?: ToolFormData | null;
}

const AdminControls = ({ 
  isOpen, 
  onClose, 
  onAddWarden, 
  onAddTool, 
  onUpdateWarden,
  onUpdateTool,
  editingWarden,
  editingTool
}: AdminControlsProps) => {
  const [activeTab, setActiveTab] = useState(editingWarden ? "warden" : editingTool ? "tool" : "warden");
  const { toast } = useToast();
  
  // Warden form state
  const [wardenForm, setWardenForm] = useState<WardenFormData>({
    name: "",
    position: "",
    area: "",
    contact: "",
  });
  
  // Tool form state
  const [toolForm, setToolForm] = useState<ToolFormData>({
    name: "",
    category: "",
    quantity: 0,
    location: "",
  });

  // Update form when editing data changes
  useEffect(() => {
    if (editingWarden) {
      setWardenForm({
        name: editingWarden.name || "",
        position: editingWarden.position || "",
        area: editingWarden.area || "",
        contact: editingWarden.contact || "",
      });
      setActiveTab("warden");
    } else if (editingTool) {
      setToolForm({
        name: editingTool.name || "",
        category: editingTool.category || "",
        quantity: editingTool.quantity || 0,
        location: editingTool.location || "",
      });
      setActiveTab("tool");
    }
  }, [editingWarden, editingTool]);

  // Reset form when modal closes
  const handleClose = () => {
    resetForms();
    onClose();
  };

  // Reset both forms
  const resetForms = () => {
    setWardenForm({
      name: "",
      position: "",
      area: "",
      contact: "",
    });
    
    setToolForm({
      name: "",
      category: "",
      quantity: 0,
      location: "",
    });
  };

  // Handle form submission for Warden
  const handleWardenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!wardenForm.name || !wardenForm.position || !wardenForm.area || !wardenForm.contact) {
      toast({
        title: "Error",
        description: "Please fill all fields",
        variant: "destructive",
      });
      return;
    }
    
    // If editing, update warden
    if (editingWarden?.id && onUpdateWarden) {
      onUpdateWarden(editingWarden.id, wardenForm);
      toast({
        title: "Success",
        description: "Warden updated successfully",
      });
    } else {
      // Otherwise add new warden
      onAddWarden(wardenForm);
      toast({
        title: "Success",
        description: "Warden added successfully",
      });
    }
    
    // Reset form and close modal
    resetForms();
    onClose();
  };
  
  // Handle form submission for Tool
  const handleToolSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!toolForm.name || !toolForm.category || toolForm.quantity <= 0 || !toolForm.location) {
      toast({
        title: "Error",
        description: "Please fill all fields. Quantity must be greater than 0.",
        variant: "destructive",
      });
      return;
    }
    
    // If editing, update tool
    if (editingTool?.id && onUpdateTool) {
      onUpdateTool(editingTool.id, toolForm);
      toast({
        title: "Success",
        description: "Tool updated successfully",
      });
    } else {
      // Otherwise add new tool
      onAddTool(toolForm);
      toast({
        title: "Success",
        description: "Tool added successfully",
      });
    }
    
    // Reset form and close modal
    resetForms();
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[95vw] sm:max-w-[540px]" side="right">
        <SheetHeader>
          <SheetTitle className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-warden to-tools">
            {editingWarden || editingTool ? "Edit Record" : "Add New Record"}
          </SheetTitle>
          <SheetDescription>
            {editingWarden || editingTool 
              ? "Update the information for this record." 
              : "Add a new warden or tool to the system."
            }
          </SheetDescription>
        </SheetHeader>
        <div className="py-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 mb-8">
              <TabsTrigger value="warden" className="data-[state=active]:bg-warden data-[state=active]:text-white">
                Warden
              </TabsTrigger>
              <TabsTrigger value="tool" className="data-[state=active]:bg-tools data-[state=active]:text-white">
                Tool
              </TabsTrigger>
            </TabsList>
            
            {/* Warden Form */}
            <TabsContent value="warden" className="animate-enter">
              <form onSubmit={handleWardenSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="warden-name">Name</Label>
                  <Input
                    id="warden-name"
                    value={wardenForm.name}
                    onChange={(e) => setWardenForm({ ...wardenForm, name: e.target.value })}
                    placeholder="Enter warden name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="warden-position">Position</Label>
                  <Input
                    id="warden-position"
                    value={wardenForm.position}
                    onChange={(e) => setWardenForm({ ...wardenForm, position: e.target.value })}
                    placeholder="Enter position"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="warden-area">Area</Label>
                  <Input
                    id="warden-area"
                    value={wardenForm.area}
                    onChange={(e) => setWardenForm({ ...wardenForm, area: e.target.value })}
                    placeholder="Enter area of responsibility"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="warden-contact">Contact</Label>
                  <Input
                    id="warden-contact"
                    value={wardenForm.contact}
                    onChange={(e) => setWardenForm({ ...wardenForm, contact: e.target.value })}
                    placeholder="Enter contact information"
                  />
                </div>
                
                <SheetFooter className="flex justify-end space-x-4 pt-4">
                  <SheetClose asChild>
                    <Button type="button" variant="outline">Cancel</Button>
                  </SheetClose>
                  <Button 
                    type="submit"
                    className="bg-warden text-white hover:bg-warden-dark"
                  >
                    {editingWarden ? "Update Warden" : "Add Warden"}
                  </Button>
                </SheetFooter>
              </form>
            </TabsContent>
            
            {/* Tool Form */}
            <TabsContent value="tool" className="animate-enter">
              <form onSubmit={handleToolSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="tool-name">Name</Label>
                  <Input
                    id="tool-name"
                    value={toolForm.name}
                    onChange={(e) => setToolForm({ ...toolForm, name: e.target.value })}
                    placeholder="Enter tool name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tool-category">Category</Label>
                  <Input
                    id="tool-category"
                    value={toolForm.category}
                    onChange={(e) => setToolForm({ ...toolForm, category: e.target.value })}
                    placeholder="Enter category"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tool-quantity">Quantity</Label>
                  <Input
                    id="tool-quantity"
                    type="number"
                    min="1"
                    value={toolForm.quantity}
                    onChange={(e) => setToolForm({ ...toolForm, quantity: parseInt(e.target.value) || 0 })}
                    placeholder="Enter quantity"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tool-location">Location</Label>
                  <Input
                    id="tool-location"
                    value={toolForm.location}
                    onChange={(e) => setToolForm({ ...toolForm, location: e.target.value })}
                    placeholder="Enter storage location"
                  />
                </div>
                
                <SheetFooter className="flex justify-end space-x-4 pt-4">
                  <SheetClose asChild>
                    <Button type="button" variant="outline">Cancel</Button>
                  </SheetClose>
                  <Button 
                    type="submit"
                    className="bg-tools text-white hover:bg-tools-dark"
                  >
                    {editingTool ? "Update Tool" : "Add Tool"}
                  </Button>
                </SheetFooter>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AdminControls;

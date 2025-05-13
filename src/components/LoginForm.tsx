
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

interface LoginFormProps {
  onLogin: (email: string, password: string, isAdmin: boolean) => void;
  onCancel: () => void;
}

const LoginForm = ({ onLogin, onCancel }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // For demonstration purposes only
      // In a real app, this would be handled by Supabase authentication
      const isAdmin = email.includes('admin');
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onLogin(email, password, isAdmin);
      
      toast({
        title: "Success",
        description: `Logged in as ${isAdmin ? 'Admin' : 'User'}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to login",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50 animate-fade-in">
      <Card className="w-full max-w-md animate-bounce-in">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-warden to-tools">
            Welcome Back
          </CardTitle>
          <CardDescription>
            Log in to access the Warden Management System
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com or user@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-input focus:border-primary focus:ring-1 focus:ring-primary"
              />
              <p className="text-xs text-muted-foreground">
                Hint: Use an email containing "admin" for admin access
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-input focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              disabled={isLoading}
              className="bg-gradient-to-r from-warden to-tools hover:opacity-90"
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default LoginForm;


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";

const Index = () => {
  // Set as always logged in and with admin privileges
  const [isLoggedIn] = useState(true);
  const [isAdmin] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Just for navigation, no actual logout
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation 
        isLoggedIn={isLoggedIn}
        isAdmin={isAdmin}
        onLogin={() => {}}
        onLogout={handleLogout}
      />

      <main className="flex-1 pt-20 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto py-20">
          <div className="text-center animate-enter">
            <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-warden to-tools mb-4">
              MUST WARDEN MANAGEMENT
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Efficient and streamlined management system for wardens and their equipment
            </p>
            
            <div className="mt-10">
              <Button 
                className="bg-gradient-to-r from-warden to-tools text-white hover:opacity-90 px-8 py-6 text-lg"
                onClick={() => navigate("/warden")}
              >
                Go to Dashboard
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-7xl mx-auto py-16">
          <h2 className="text-3xl font-bold text-center mb-12">System Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-enter-bounce">
              <CardHeader className="bg-gradient-to-br from-warden-light to-warden text-white rounded-t-lg">
                <CardTitle>Warden Management</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <CardDescription className="text-foreground text-base">
                  Efficiently manage all wardens with their contact information, positions, and assigned areas.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-enter-bounce" style={{ animationDelay: "0.1s" }}>
              <CardHeader className="bg-gradient-to-br from-tools-light to-tools text-white rounded-t-lg">
                <CardTitle>Tool Inventory</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <CardDescription className="text-foreground text-base">
                  Keep track of all tools and equipment, their quantities, categories, and storage locations.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-enter-bounce" style={{ animationDelay: "0.2s" }}>
              <CardHeader className="bg-gradient-to-br from-warden to-tools text-white rounded-t-lg">
                <CardTitle>Role-Based Access</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <CardDescription className="text-foreground text-base">
                  Different access levels for administrators and regular users with appropriate permissions.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="max-w-7xl mx-auto py-16">
          <Card className="bg-gradient-to-br from-warden/10 to-tools/10 border-none shadow-lg">
            <CardContent className="p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to get started?</h2>
                <p className="text-muted-foreground max-w-lg">
                  Access the warden management system and start managing your resources efficiently.
                </p>
              </div>
              <Button 
                className="bg-gradient-to-r from-warden to-tools text-white hover:opacity-90 px-6 py-2 text-lg whitespace-nowrap"
                onClick={() => navigate("/warden")}
              >
                Go to Dashboard
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-muted py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-muted-foreground">
            © {new Date().getFullYear()} MUST Warden Management System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

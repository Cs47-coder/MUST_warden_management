
import { useState } from "react";
import Navigation from "../components/Navigation";
import LoginForm from "../components/LoginForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const About = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleLogin = (email: string, password: string, isAdmin: boolean) => {
    setIsLoggedIn(true);
    setIsAdmin(isAdmin);
    setShowLoginForm(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation 
        isLoggedIn={isLoggedIn}
        isAdmin={isAdmin}
        onLogin={() => setShowLoginForm(true)}
        onLogout={handleLogout}
      />

      <main className="flex-1 pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto py-16">
          <div className="text-center mb-16 animate-enter">
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-warden to-tools mb-4">
              About MUST Warden Management
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Learn about our system and its purpose
            </p>
          </div>
          
          <div className="space-y-16">
            {/* Overview Section */}
            <section className="animate-enter">
              <Card className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-warden to-tools text-white">
                  <CardTitle className="text-2xl">System Overview</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 text-lg">
                  <p className="mb-4">
                    The MUST Warden Management System is a comprehensive solution designed to streamline 
                    the management of wardens and their equipment at the institution. The system provides 
                    an intuitive interface for administrators and users to access relevant information.
                  </p>
                  <p>
                    By centralizing data and implementing role-based access control, the system ensures 
                    that information is both secure and accessible to those who need it. Administrators 
                    have full control over the data, while regular users can view necessary information.
                  </p>
                </CardContent>
              </Card>
            </section>
            
            {/* Purpose Section */}
            <section className="animate-enter" style={{ animationDelay: "0.1s" }}>
              <Card>
                <CardHeader className="bg-gradient-to-r from-tools to-warden text-white">
                  <CardTitle className="text-2xl">Our Purpose</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-warden">Efficient Management</h3>
                      <p className="text-muted-foreground">
                        Streamline warden assignment, contact management, and area responsibility tracking 
                        with our intuitive interface.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-tools">Resource Tracking</h3>
                      <p className="text-muted-foreground">
                        Keep accurate records of all tools and equipment, their locations, and quantities 
                        to prevent loss and ensure availability.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-warden">Data Security</h3>
                      <p className="text-muted-foreground">
                        Role-based access ensures sensitive information is only accessible to authorized 
                        personnel while maintaining transparency.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-tools">User Accessibility</h3>
                      <p className="text-muted-foreground">
                        Provide easy access to information for all users while maintaining appropriate 
                        permission levels for system integrity.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
            
            {/* Technical Details */}
            <section className="animate-enter" style={{ animationDelay: "0.2s" }}>
              <Card>
                <CardHeader className="bg-gradient-to-r from-warden-light to-tools-light">
                  <CardTitle className="text-2xl text-foreground">Technical Implementation</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <CardDescription className="text-foreground text-base mb-6">
                    The MUST Warden Management System is built using modern web technologies to ensure performance, 
                    scalability, and security.
                  </CardDescription>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <h3 className="text-lg font-semibold mb-2">Frontend</h3>
                      <p>Built with React and TypeScript for a responsive, type-safe user interface</p>
                    </div>
                    
                    <div className="p-4 bg-muted rounded-lg">
                      <h3 className="text-lg font-semibold mb-2">Backend</h3>
                      <p>Powered by NextJS API routes for server-side logic and data processing</p>
                    </div>
                    
                    <div className="p-4 bg-muted rounded-lg">
                      <h3 className="text-lg font-semibold mb-2">Database</h3>
                      <p>Uses Supabase for real-time data storage, authentication, and access control</p>
                    </div>
                    
                    <div className="p-4 bg-muted rounded-lg">
                      <h3 className="text-lg font-semibold mb-2">User Access</h3>
                      <p>Implements secure authentication and role-based access control</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-muted py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-muted-foreground">
            © {new Date().getFullYear()} MUST Warden Management System. All rights reserved.
          </p>
        </div>
      </footer>
      
      {/* Login Form Modal */}
      {showLoginForm && (
        <LoginForm
          onLogin={handleLogin}
          onCancel={() => setShowLoginForm(false)}
        />
      )}
    </div>
  );
};

export default About;

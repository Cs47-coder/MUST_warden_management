
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import Dashboard from "../components/Dashboard";

const Warden = () => {
  // Set as always logged in and with admin privileges
  const [isLoggedIn] = useState(true);
  const [isAdmin] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
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

      <main className="flex-1 pt-20 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          <Dashboard isAdmin={isAdmin} />
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-muted py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-muted-foreground">
            © {new Date().getFullYear()} MUST Warden Management System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Warden;

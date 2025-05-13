
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

interface NavigationProps {
  isLoggedIn: boolean;
  isAdmin: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

const Navigation = ({ isLoggedIn, isAdmin, onLogout }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="h-8 w-auto bg-gradient-to-r from-warden to-tools rounded-full p-1 animate-pulse-soft"></div>
              <span className="ml-3 font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-warden to-tools">
                MUST WARDEN MANAGEMENT
              </span>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Home
            </NavLink>
            <NavLink to="/warden" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Warden
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              About
            </NavLink>
          </div>
          
          {/* Mobile Navigation Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-primary hover:text-primary-dark focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden animate-enter-slide">
          <div className="pt-2 pb-3 space-y-1">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `block px-3 py-2 text-base font-medium ${
                  isActive 
                    ? 'text-white bg-gradient-to-r from-warden to-tools' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink 
              to="/warden" 
              className={({ isActive }) => 
                `block px-3 py-2 text-base font-medium ${
                  isActive 
                    ? 'text-white bg-gradient-to-r from-warden to-tools' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Warden
            </NavLink>
            <NavLink 
              to="/about" 
              className={({ isActive }) => 
                `block px-3 py-2 text-base font-medium ${
                  isActive 
                    ? 'text-white bg-gradient-to-r from-warden to-tools' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;

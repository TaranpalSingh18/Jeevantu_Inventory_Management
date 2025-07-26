import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import Sidebar from "../ui/Sidebar";
import Header from "./Header";

export default function MainLayout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    // Close mobile menu when location changes
    closeMobileMenu();
  }, [location]);

  // Get title based on current route
  const getPageTitle = () => {
    const routeTitles = {
      "/": "Dashboard",
      "/inventory": "Inventory",
      "/sales": "Sales",
      "/payments": "Payments",
      "/reports": "Reports",
      "/settings": "Settings",
    };
    
    return routeTitles[location] || "Dashboard";
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#F4F1DE] font-['Inter'] text-[#264653]">
      {/* Sidebar - hidden on mobile unless toggled */}
      <div className={`md:flex md:flex-shrink-0 ${isMobileMenuOpen ? 'fixed inset-0 z-40 block' : 'hidden'}`}>
        <Sidebar isMobile={isMobileMenuOpen} closeMobileMenu={closeMobileMenu} />
        
        {/* Overlay for mobile menu */}
        {isMobileMenuOpen && (
          <div 
            className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={closeMobileMenu}
          ></div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header title={getPageTitle()} toggleMobileMenu={toggleMobileMenu} />
        
        <main className="flex-1 overflow-y-auto bg-[#FAF8EF] pb-10">
          {children}
        </main>
      </div>
    </div>
  );
}
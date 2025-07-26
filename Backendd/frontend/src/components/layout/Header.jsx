import { useState } from "react";
import { Bell, Menu, Search } from "lucide-react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

export default function Header({ title, toggleMobileMenu }) {
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleSearch = (e) => {
    e.preventDefault();
    // Implementation for search functionality
    console.log("Searching for:", searchQuery);
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon"
            className="md:hidden text-[#264653] p-2 rounded-md hover:bg-[#E5E0C6]"
            onClick={toggleMobileMenu}
          >
            <Menu className="text-xl" />
          </Button>
          <h1 className="text-lg md:text-xl font-semibold font-['Poppins'] text-[#264653]">
            {title}
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <form onSubmit={handleSearch} className="relative flex-shrink-0">
            <div className="flex bg-[#F4F1DE] rounded-md p-2">
              <Search className="h-5 w-5 text-gray-400" />
              <Input 
                type="text" 
                placeholder="Search..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="ml-2 bg-transparent border-none outline-none text-sm text-[#264653] w-32 lg:w-64 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
          </form>
          
          <Button 
            variant="ghost"
            size="icon"
            className="relative p-2 text-[#264653] rounded-full hover:bg-[#E5E0C6] focus:outline-none"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E76F51] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#E76F51]"></span>
            </span>
          </Button>
        </div>
      </div>
    </header>
  );
}
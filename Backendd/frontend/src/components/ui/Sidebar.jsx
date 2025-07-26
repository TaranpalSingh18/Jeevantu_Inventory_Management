// import { useState } from "react";
// import { Link, useLocation } from "wouter";
// import { Shield, LayoutDashboard, Package, ShoppingCart, CreditCard, BarChart3, Settings, HelpCircle, LogOut } from "lucide-react";
// import { Button } from "./Button";
// import { Separator } from "./Seperator";
// import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";

// export default function Sidebar({ isMobile, closeMobileMenu }) {
//   const [location] = useLocation();
  
//   const isActive = (path) => {
//     return location === path;
//   };

//   const navItems = [
//     { href: "/", icon: LayoutDashboard, label: "Dashboard" },
//     { href: "/inventory", icon: Package, label: "Inventory" },
//     { href: "/sales", icon: ShoppingCart, label: "Sales" },
//     { href: "/payments", icon: CreditCard, label: "Payments" },
//     { href: "/reports", icon: BarChart3, label: "Reports" },
//     { href: "/settings", icon: Settings, label: "Settings" },
//   ];

//   const handleLinkClick = () => {
//     if (isMobile) {
//       closeMobileMenu();
//     }
//   };

//   return (
//     <div className={`flex flex-col w-64 bg-[#264653] text-white h-full`}>
//       <div className="flex items-center justify-center h-20 border-b border-[#3A6A7E] bg-[#1A2F38]">
//         <div className="flex items-center space-x-2">
//           <Shield className="w-8 h-8 text-[#E9C46A]" />
//           <h1 className="text-xl font-bold font-['Quicksand'] tracking-wider">Jeevantu</h1>
//         </div>
//       </div>
      
//       <div className="flex flex-col flex-grow pt-5 overflow-y-auto">
//         <nav className="flex-1 px-2 space-y-1">
//           {navItems.map((item) => (
//             <Link 
//               key={item.href} 
//               href={item.href}
//               onClick={handleLinkClick}
//             >
//               <a className={`flex items-center px-4 py-3 text-sm font-medium rounded-md group cursor-pointer
//                 ${isActive(item.href) 
//                   ? 'bg-[#2A9D8F] text-white' 
//                   : 'text-[#F4F1DE] hover:bg-[#3A6A7E]'
//                 }`}
//               >
//                 <item.icon className="mr-3 h-5 w-5" />
//                 {item.label}
//               </a>
//             </Link>
//           ))}
//         </nav>
        
//         <div className="p-4 mt-6">
//           <div className="p-4 bg-[#2A9D8F] rounded-lg bg-opacity-20">
//             <h3 className="text-[#E9C46A] font-medium mb-1 font-['Quicksand']">Need Help?</h3>
//             <p className="text-xs text-[#FAF8EF]">Access support resources and documentation</p>
//             <Button 
//               className="mt-3 w-full px-3 py-2 text-xs font-medium bg-[#E9C46A] text-[#264653] rounded-md hover:bg-[#F2D89F]"
//             >
//               View Support
//             </Button>
//           </div>
//         </div>
//       </div>
      
//       <div className="flex items-center p-4 border-t border-[#3A6A7E]">
//         <Avatar>
//           <AvatarImage src="" />
//           <AvatarFallback>SJ</AvatarFallback>
//         </Avatar>
//         <div className="ml-3">
//           <p className="text-sm font-medium text-white">Admin</p>
//           <p className="text-xs text-[#FAF8EF]">Shop Manager</p>
//         </div>
//         <button className="ml-auto text-[#FAF8EF] hover:text-white">
//           <LogOut className="h-5 w-5" />
//         </button>
//       </div>
//     </div>
//   );
// }



import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Shield, LayoutDashboard, Package, ShoppingCart, CreditCard, BarChart3, Settings, HelpCircle, LogOut } from "lucide-react";
import { Button } from "./Button";
import { Separator } from "./Seperator";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";

export default function Sidebar({ isMobile, closeMobileMenu }) {
  const [location, setLocation] = useLocation();
  
  const isActive = (path) => {
    return location === path;
  };

  const navItems = [
    { href: "/", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/inventory", icon: Package, label: "Inventory" },
    { href: "/sales", icon: ShoppingCart, label: "Sales" },
    { href: "/payments", icon: CreditCard, label: "Payments" },
    { href: "/reports", icon: BarChart3, label: "Reports" },
    { href: "/settings", icon: Settings, label: "Settings" },
  ];

  const handleLinkClick = () => {
    if (isMobile) {
      closeMobileMenu();
    }
  };

  return (
    <div className="flex flex-col w-64 bg-[#264653] text-white h-full">
      <div className="flex items-center justify-center h-20 border-b border-[#3A6A7E] bg-[#1A2F38]">
        <div className="flex items-center space-x-2">
          <Shield className="w-8 h-8 text-[#E9C46A]" />
          <h1 className="text-xl font-bold font-['Quicksand'] tracking-wider">Jeevantu</h1>
        </div>
      </div>
      
      <div className="flex flex-col flex-grow pt-5 overflow-y-auto">
        <nav className="flex-1 px-2 space-y-1">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={handleLinkClick}>
              <a className={`flex items-center px-4 py-3 text-sm font-medium rounded-md group cursor-pointer
                ${isActive(item.href) 
                  ? 'bg-[#2A9D8F] text-white' 
                  : 'text-[#F4F1DE] hover:bg-[#3A6A7E]'
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.label}
              </a>
            </Link>
          ))}
        </nav>
        
        <div className="p-4 mt-6">
          <div className="p-4 bg-[#2A9D8F] rounded-lg bg-opacity-20">
            <h3 className="text-[#E9C46A] font-medium mb-1 font-['Quicksand']">Need Help?</h3>
            <p className="text-xs text-[#FAF8EF]">Access support resources and documentation</p>
            <Button className="mt-3 w-full px-3 py-2 text-xs font-medium bg-[#E9C46A] text-[#264653] rounded-md hover:bg-[#F2D89F]">
              View Support
            </Button>
          </div>
        </div>
      </div>
      
      <div className="flex items-center p-4 border-t border-[#3A6A7E]">
        <Avatar>
          <AvatarImage src="" />
          <AvatarFallback>SJ</AvatarFallback>
        </Avatar>
        <div className="ml-3">
          <p className="text-sm font-medium text-white">Admin</p>
          <p className="text-xs text-[#FAF8EF]">Shop Manager</p>
        </div>
        {/* Logout button navigates to the root path */}
        <button 
          className="ml-auto text-[#FAF8EF] hover:text-white"
          onClick={() => setLocation("/")}
        >
          <LogOut className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

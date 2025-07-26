import React from "react";
import { Phone, Mail, MessageSquare } from "lucide-react";
import Logo from "../../assets/logo.png"

export default function Header() {
  return (
    <>

      {/* Main Navigation */}
      <header className="bg-white px-6 shadow-sm">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <a href="/" className="flex items-center mb-2 md:mb-0">
            <div className="relative w-48 h-24">
              <img
                src={Logo}
                alt="Jeevantu Logo"
                className="object-contain w-full h-full"
                style={{ filter: "drop-shadow(0px 1px 1px rgba(0,0,0,0.1))" }}
              />
            </div>
          </a>
           <nav className="flex flex-wrap justify-center gap-4 md:gap-8">
           {/* <a href="/about" className="text-[#2a4a2a] font-medium hover:text-green-700">
              About Jeevantu
            </a>
            <a href="/ourproducts" className="text-[#2a4a2a] font-medium hover:text-green-700">
              Prouducts
            </a>
            <a href="/careers" className="text-[#2a4a2a] font-medium hover:text-green-700">
              Careers
            </a> */}
            <a href="/auth" className="text-[#2a4a2a] font-medium hover:text-green-700">
              Login | Signup
            </a>
          </nav>
        </div>
      </header>
    </>
  );
}

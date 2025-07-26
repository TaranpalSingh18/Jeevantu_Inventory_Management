import { Link } from "react-router-dom";
import { Phone, Twitter, Facebook, Linkedin, Youtube } from "lucide-react";
import Logo from "../../assets/logo.png";

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Logo Column */}
          <div className="md:col-span-1">
            <Link to="/" className="block mb-6">
              <img
                src={Logo}
                alt="Jeevantu Logo"
                className="w-48 h-24 object-contain drop-shadow-md"
              />
            </Link>
          </div>

          {/* About Column */}
          <div className="md:col-span-1">
            <h3 className="text-[#2a4a2a] font-semibold text-lg mb-4">About Jeevantu</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-gray-600 hover:text-[#2a4a2a] text-sm">History Of Jeevantu</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-[#2a4a2a] text-sm">Flora In Jeevantu</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-[#2a4a2a] text-sm">Fauna In Jeevantu</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-[#2a4a2a] text-sm">Location Of Jeevantu</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-[#2a4a2a] text-sm">Geography Of Jeevantu</Link></li>
            </ul>
          </div>

          {/* Hotels & Packages Column */}
          <div className="md:col-span-1">
            <h3 className="text-[#2a4a2a] font-semibold text-lg mb-4">Jeevantu Hotels</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-gray-600 hover:text-[#2a4a2a] text-sm">High-End Resorts</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-[#2a4a2a] text-sm">Luxury Resorts</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-[#2a4a2a] text-sm">Deluxe Resorts</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-[#2a4a2a] text-sm">Standard Resorts</Link></li>
            </ul>
          </div>

          {/* Safari Info Column */}
          <div className="md:col-span-1">
            <h3 className="text-[#2a4a2a] font-semibold text-lg mb-4">Safari Info</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-gray-600 hover:text-[#2a4a2a] text-sm">Jeep Safari</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-[#2a4a2a] text-sm">Elephant Safari</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-[#2a4a2a] text-sm">Safari Zones</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-[#2a4a2a] text-sm">Safari Timings</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-[#2a4a2a] text-sm">Safari Booking</Link></li>
            </ul>
          </div>

          {/* Travel Info & Others Column */}
          <div className="md:col-span-1">
            <h3 className="text-[#2a4a2a] font-semibold text-lg mb-4">Travel Info</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-gray-600 hover:text-[#2a4a2a] text-sm">Best Time To Visit</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-[#2a4a2a] text-sm">How To Reach</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-[#2a4a2a] text-sm">Weather At Jeevantu</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-[#2a4a2a] text-sm">Places To See</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-[#2a4a2a] text-sm">Places To Visit</Link></li>
            </ul>
          </div>
        </div>

        {/* Copyright and Social Media */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">Copyright © {new Date().getFullYear()} Jeevantu-national-park.com</p>
          <div className="flex space-x-4">
            {/* <Link to="#"><Twitter className="h-5 w-5 text-gray-600 hover:text-[#2a4a2a]" /></Link>
            <Link to="#"><Facebook className="h-5 w-5 text-gray-600 hover:text-[#2a4a2a]" /></Link>
            <Link to="#"><Linkedin className="h-5 w-5 text-gray-600 hover:text-[#2a4a2a]" /></Link>
            <Link to="#"><Youtube className="h-5 w-5 text-gray-600 hover:text-[#2a4a2a]" /></Link> */}
          </div>
          {/* <div className="mt-4 md:mt-0 flex items-center space-x-2">
            <img src="/payment-icon.png" alt="Payment Method" width={30} height={30} />
            <img src="/payment-icon.png" alt="Payment Method" width={30} height={30} />
            <img src="/payment-icon.png" alt="Payment Method" width={30} height={30} />
          </div> */}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bg-[#f5f5f0] py-4 border-t border-gray-200">
        <div className="container mx-auto flex justify-center space-x-16">
     
          <Link to="tel:+919212777223" className="flex flex-col items-center text-[#2a4a2a]">
            <Phone className="h-6 w-6 mb-1" />
            <span className="text-sm">+91 9212777223</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
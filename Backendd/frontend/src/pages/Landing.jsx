"use client";

import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { ShoppingBag, User, UserCog } from "lucide-react";
import { cn } from "../lib/utils";
import Background from "../assets/trees.jpg"; // Ensure this is correctly resolved

export default function LandingPage() {
  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${Background})`, 
        backdropFilter: "blur(30px)"
      }}
    >
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 flex-1 flex flex-col justify-center items-center text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 shadow-md">
          Jungle Safari Souvenir Shop
        </h1>
        <p className="text-lg md:text-xl text-white max-w-2xl mb-12 shadow-md">
          Explore our collection of handcrafted souvenirs and memorabilia from your unforgettable jungle safari adventure.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
          {/* Admin Login */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-white bg-white/10 backdrop-blur-lg">
            <CardContent className="p-0">
              <div className="bg-[#2A9D8F] p-4 flex justify-center">
                <UserCog className="h-16 w-16 text-white" />
              </div>
              <div className="p-6 text-white">
                <h2 className="text-xl font-semibold mb-3">Admin Portal</h2>
                <p className="mb-6">
                  Manage inventory, sales, and reports with our comprehensive admin dashboard.
                </p>
                <Link href="/admin-login">
                  <Button className="w-full bg-[#2A9D8F] hover:bg-[#1E7268]">
                    Admin Login
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Cashier Login */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-white bg-white/10 backdrop-blur-lg">
            <CardContent className="p-0">
              <div className="bg-[#E9C46A] p-4 flex justify-center">
                <ShoppingBag className="h-16 w-16 text-white" />
              </div>
              <div className="p-6 text-white">
                <h2 className="text-xl font-semibold mb-3">Cashier Portal</h2>
                <p className="mb-6">
                  Generate bills and process sales transactions quickly and efficiently.
                </p>
                <Link href="/cashier-login">
                  <Button className="w-full bg-[#E9C46A] hover:bg-[#D9B45A]">
                    Cashier Login
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Online User Login */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-white bg-white/10 backdrop-blur-lg">
            <CardContent className="p-0">
              <div className="bg-[#E76F51] p-4 flex justify-center">
                <User className="h-16 w-16 text-white" />
              </div>
              <div className="p-6 text-white">
                <h2 className="text-xl font-semibold mb-3">Online Shop</h2>
                <p className="mb-6">
                  Browse our collection, add items to cart, and shop from the comfort of your home.
                </p>
                <Link href="/user-login">
                  <Button className="w-full bg-[#E76F51] hover:bg-[#D75F41]">
                    Customer Login
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

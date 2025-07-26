
import React from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";
import forest from "../assets/forest-adobe.jpeg"
import heroBg from "../assets/heroBg.png"
import nature from "../assets/nature.png"
import naturee from "../assets/nature2.png"
import sher from "../assets/sher.png"
import birds from "../assets/birds.jpeg"
import logo from "../assets/logo.png"
import bg from "../assets/bg1.png"
import kanhapark from "../assets/kanhapark.jpg"
import bride from "../assets/bride.webp"
import loo from "../assets/loo.png"
import lionn from "../assets/lionn.png"
import vultures from "../assets/vultures.jpg"
import mp from "../assets/mp.jpg"
import elephants from '../assets/elephants.jpg'


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-[#2a4a2a] py-16 md:py-24">
        <div className="absolute inset-0 z-0">
          <img
            src={forest}
            alt="Forest Background"
            className="object-cover opacity-30 w-full h-full"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="text-white">
              <h1 className="text-5xl md:text-4xl lg:text-7xl font-semibold mb-5 pt-6 pl-10 pr-10">
                Join us on a Journey into The Heart of The Wild!
              </h1>
              <p className="text-white mt-2 pl-10 pr-30 pt-3 text-md">Introducing our cutting-edge Inventory Management System for Jungle Safari’s souvenir shop! Designed to streamline stock tracking, automate sales, and ensure secure transactions, our solution offers real-time inventory updates, multi-channel sales integration, and advanced analytics. Elevate efficiency, enhance customer engagement, and simplify operations—all in one intelligent system!</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-3xl overflow-hidden relative">
                <img
                  src={heroBg}
                  alt="Wildlife"
                  width="400"
                  height="300"
                  className="w-full h-full object-cover border border-solid-2pt border-white"
                />
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <h3 className="text-xl font-semibold">Wildlife</h3>
                </div>
              </div>
              <div className="rounded-3xl overflow-hidden relative">
                <img
                  src={nature}
                  alt="Tour Packages"
                  width="400"
                  height="300"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <h3 className="text-xl font-semibold">Tour Packages</h3>
                </div>
              </div>
              <div className="rounded-3xl overflow-hidden relative">
                <img
                  src={naturee}
                  alt="Jeep Safari"
                  width="400"
                  height="300"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <h3 className="text-xl font-semibold">Jeep Safari</h3>
                </div>
              </div>
              <div className="rounded-3xl overflow-hidden relative">
                <img
                  src={sher}
                  alt="Elephant Safari"
                  width="400"
                  height="300"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <h3 className="text-xl font-semibold">Elephant Safari</h3>
                </div>
              </div>
              <div className="rounded-3xl overflow-hidden relative">
                <img
                  src={birds}
                  alt="Birds Watching"
                  width="400"
                  height="300"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <h3 className="text-xl font-semibold">Birds Watching</h3>
                </div>
              </div>
              <div className="rounded-3xl overflow-hidden relative">
                <img
                  src={elephants}
                  alt="Jeevantu"
                  width="400"
                  height="200"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <h3 className="text-xl font-semibold">Jeevantu</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="relative py-16 bg-[#f5f5f0] mt-100 h-120">
  <img
    src={bg}
    alt="Forest Background"
    className="absolute inset-0 object-contain opacity-30 w-full"
  />
  <div className="relative container mx-auto px-4 h-240">
    <div className="gap-12 mr-72">
      <div className="space-y-10">
        {/* Your heading could go here */}
      </div>
      <div className="space-y-6">
        <p className="text-[#2a4a2a]">
          Welcome to the future of seamless inventory management! Our intelligent system for Jungle Safari’s souvenir shop is engineered to revolutionize your operations by delivering real-time stock tracking, automated sales workflows, and secure transaction processing. With advanced analytics and robust multi-channel support, our solution not only minimizes manual interventions but also enhances data-driven decision-making. Embrace a smart, connected approach that transforms inventory oversight into a streamlined, proactive process—boosting customer engagement, optimizing resource allocation, and driving sustainable growth in an ever-evolving marketplace.
        </p>
        <a
          href="#"
          className="inline-block px-6 py-3 border border-[#2a4a2a] text-[#2a4a2a] rounded-md hover:bg-[#2a4a2a] hover:text-white transition-colors"
        >
          Read More
        </a>
      </div>
    </div>
  </div>
</section>


      {/* Things To Do Section */}
      <section className="py-16 bg-[#f5f5f0]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-[#2a4a2a]">Things To Do</h2>
              <p className="text-[#2a4a2a]">Experience the ultimate adventure in Jeevantu National Park</p>
              <a
                href="#"
                className="inline-block px-6 py-3 border border-[#2a4a2a] text-[#2a4a2a] rounded-md hover:bg-[#2a4a2a] hover:text-white transition-colors"
              >
                Explore Now
              </a>
            </div>
            <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-3xl overflow-hidden relative">
                <img
                  src={bride}
                  alt="Bird Watching"
                  width="500"
                  height="300"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-black/20 px-2 py-1 rounded text-white text-sm">
                  Bird
                </div>
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <h3 className="text-2xl font-semibold">Watching</h3>
                  <ArrowRight className="absolute right-4 bottom-4 h-6 w-6" />
                </div>
              </div>
              <div className="rounded-3xl overflow-hidden relative h-full">
                <img
                  src={kanhapark}
                  alt="Heritage Sightseeing"
                  width="400"
                  height="600"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-black/20 px-2 py-1 rounded text-white text-sm">
                  Heritage
                </div>
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <h3 className="text-2xl font-semibold">Sightseeing</h3>
                </div>
              </div>
              <div className="rounded-3xl overflow-hidden relative">
                <img
                  src={loo}
                  alt="Wildlife Safari"
                  width="500"
                  height="300"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-black/20 px-2 py-1 rounded text-white text-sm">
                  Wildlife
                </div>
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <h3 className="text-2xl font-semibold">Safari</h3>
                  <ArrowRight className="absolute right-4 bottom-4 h-6 w-6" />
                </div>
              </div>
              <div className="rounded-3xl overflow-hidden relative">
                <img
                  src={lionn}
                  alt="Elephant Ride"
                  width="500"
                  height="300"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-black/20 px-2 py-1 rounded text-white text-sm">
                  Elephant
                </div>
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <h3 className="text-2xl font-semibold">Ride</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tour Packages Section */}
      {/* <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl font-bold text-[#2a4a2a]">Jeevantu Tour Packages</h2>
            <div className="flex space-x-2">
              <button className="p-3 border rounded-full hover:bg-gray-100">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button className="p-3 border rounded-full hover:bg-gray-100">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
          <p className="text-[#2a4a2a] mb-8 max-w-3xl">
            Book one of our specially crafted Jeevantu tour packages to explore India's one of the greatest national
            parks and visit its wonderful tourist spots.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-3xl overflow-hidden">
              <div className="relative">
                <img
                  src="/placeholder.svg?height=300&width=400"
                  alt="Wildlife Tour"
                  width="400"
                  height="300"
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="p-4">
                <div className="text-sm text-gray-600 mb-2">5 Nights / 6 Days</div>
                <h3 className="text-xl font-semibold text-[#2a4a2a]">Wildlife Tour Jeevantu</h3>
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden">
              <div className="relative">
                <img
                  src="/placeholder.svg?height=300&width=400"
                  alt="Weekend Tour"
                  width="400"
                  height="300"
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="p-4">
                <div className="text-sm text-gray-600 mb-2">4 Nights / 5 Days</div>
                <h3 className="text-xl font-semibold text-[#2a4a2a]">Weekend Tour to Jeevantu</h3>
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden">
              <div className="relative">
                <img
                  src="/placeholder.svg?height=300&width=400"
                  alt="Safari Tour"
                  width="400"
                  height="300"
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="p-4">
                <div className="text-sm text-gray-600 mb-2">20 Nights / 21 Days</div>
                <h3 className="text-xl font-semibold text-[#2a4a2a]">
                  A Safari through Indian Wilderness
                </h3>
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden">
              <div className="relative">
                <img
                  src="/placeholder.svg?height=300&width=400"
                  alt="Photographic Tour"
                  width="400"
                  height="300"
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="p-4">
                <div className="text-sm text-gray-600 mb-2">9 Nights / 10 Days</div>
                <h3 className="text-xl font-semibold text-[#2a4a2a]">
                  Jeevantu Photographic Safari Tour
                </h3>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <button className="p-3 border rounded-full hover:bg-gray-100 mr-2">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button className="p-3 border rounded-full hover:bg-gray-100">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section> */}

      {/* Latest News Section */}
      <section className="py-16 bg-[#2a4a2a] text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold">Latest News</h2>
              <p>Get the latest Jeevantu travel blogs and wildlife news updates.</p>
              <a
                href="#"
                className="inline-block px-6 py-3 border border-white rounded-md hover:bg-white hover:text-[#2a4a2a] transition-colors"
              >
                Explore More
              </a>

              <div className="mt-12 p-6 bg-[#f5f5f0]/10 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-4">Explore Jeevantu</h3>
                <a
                  href="#"
                  className="inline-block px-6 py-3 bg-[#2a4a2a] border border-white text-white rounded-md hover:bg-white hover:text-[#2a4a2a] transition-colors"
                >
                  Tour Packages
                </a>
              </div>
              
            </div>

            <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-3xl overflow-hidden relative">
                <img
                  src={vultures}
                  alt="Vultures Census"
                  width="500"
                  height="400"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black/80 to-transparent w-full">
                  <div className="text-sm mb-2">Posted on May 5, 2024</div>
                  <h3 className="text-xl font-semibold">
                    Vultures Census in Jeevantu National Park
                  </h3>
                  <ArrowRight className="absolute right-4 bottom-4 h-6 w-6" />
                </div>
              </div>

              <div className="rounded-3xl overflow-hidden relative">
                <img
                  src={mp}
                  alt="Best Places to Visit"
                  width="500"
                  height="400"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black/80 to-transparent w-full">
                  <div className="text-sm mb-2">Posted on June 6, 2023</div>
                  <h3 className="text-xl font-semibold">
                    10 Best Places to Visit in Madhya Pradesh
                  </h3>
                  <ArrowRight className="absolute right-4 bottom-4 h-6 w-6" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-8">
            <button className="p-3 bg-white text-[#2a4a2a] rounded-full hover:bg-gray-100 mr-2">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button className="p-3 bg-white text-[#2a4a2a] rounded-full hover:bg-gray-100">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Wave Pattern */}
      <div className="bg-[#f5f5f0] py-12">
  <div className="container mx-auto">
    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-24">
      <path
        d="M0,40 C100,10 200,70 300,40 C400,10 500,70 600,40 C700,10 800,70 900,40 C1000,10 1100,70 1200,40"
        className="stroke-[#2a4a2a] stroke-2 fill-none"
      ></path>
      <path
        d="M0,60 C100,30 200,90 300,60 C400,30 500,90 600,60 C700,30 800,90 900,60 C1000,30 1100,90 1200,60"
        className="stroke-[#2a4a2a] stroke-2 fill-none"
      ></path>
      <path
        d="M0,80 C100,50 200,110 300,80 C400,50 500,110 600,80 C700,50 800,110 900,80 C1000,50 1100,110 1200,80"
        className="stroke-[#2a4a2a] stroke-2 fill-none"
      ></path>
    </svg>
  </div>
</div>
      <Footer />
    </main>
  );
}
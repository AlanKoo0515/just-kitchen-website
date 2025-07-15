"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BathroomHeroSection from "@/components/BathroomHeroSection";
import ProductFilters from "@/components/ProductFilters";
import ProductGrid from "@/components/ProductGrid";

const mockProducts = [
  {
    image: "/featured/basincabinet.png",
    name: "Wash Basin Tap",
    price: "RM 980.00",
    colors: ["#FFD700", "#F4C542", "#000000"],
  },
  {
    image: "/featured/basincabinet.png",
    name: "Wash Basin Tap",
    price: "RM 980.00",
    colors: ["#FFD700", "#F4C542", "#000000"],
  },
  {
    image: "/featured/basincabinet.png",
    name: "Wash Basin Tap",
    price: "RM 980.00",
    colors: ["#FFD700", "#F4C542", "#000000"],
  },
  {
    image: "/featured/basincabinet.png",
    name: "Wash Basin Tap",
    price: "RM 980.00",
    colors: ["#FFD700", "#F4C542", "#000000"],
  },
  {
    image: "/featured/basincabinet.png",
    name: "Wash Basin Tap",
    price: "RM 980.00",
    colors: ["#FFD700", "#F4C542", "#000000"],
  },
  {
    image: "/featured/basincabinet.png",
    name: "Wash Basin Tap",
    price: "RM 980.00",
    colors: ["#FFD700", "#F4C542", "#000000"],
  },
  {
    image: "/featured/basincabinet.png",
    name: "Wash Basin Tap",
    price: "RM 980.00",
    colors: ["#FFD700", "#F4C542", "#000000"],
  },
  {
    image: "/featured/basincabinet.png",
    name: "Wash Basin Tap",
    price: "RM 980.00",
    colors: ["#FFD700", "#F4C542", "#000000"],
  },
  {
    image: "/featured/basincabinet.png",
    name: "Wash Basin Tap",
    price: "RM 980.00",
    colors: ["#FFD700", "#F4C542", "#000000"],
  },
];

export default function ProductListPage() {
  return (
    <>
      <Navbar />
      <div className="bg-[#f7f7fa] min-h-screen">
        <BathroomHeroSection />
        <main className="pt-8 pb-16">
          <div className="max-w-7xl mx-auto px-40 py-8">
            <ProductFilters />
            <ProductGrid products={mockProducts} />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

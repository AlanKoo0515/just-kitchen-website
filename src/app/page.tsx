"use client";

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CategoryGrid from "@/components/CategoryGrid";
import FeaturedProducts from "@/components/FeaturedProducts";
import Partnerships from "@/components/Partnerships";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { FiChevronUp } from "react-icons/fi";

export default function Home() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <CategoryGrid />
        <FeaturedProducts />
        <Partnerships />
      </main>
      <Footer />
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 bg-white border border-gray-300 shadow-lg rounded-full p-3 text-2xl text-[#a52a2a] hover:bg-[#a52a2a] hover:text-white transition-colors duration-200 focus:outline-none"
          aria-label="Back to top"
        >
          <FiChevronUp />
        </button>
      )}
    </div>
  );
}

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CategoryGrid from "@/components/CategoryGrid";
import FeaturedProducts from "@/components/FeaturedProducts";
import Partnerships from "@/components/Partnerships";
import Footer from "@/components/Footer";

export default function Home() {
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
    </div>
  );
}

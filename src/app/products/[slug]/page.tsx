"use client";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import ProductImageGallery from "@/components/product/ProductImageGallery";
import ProductInfo from "@/components/product/ProductInfo";
import RelatedProducts from "@/components/product/RelatedProducts";

const mockProduct = {
  name: "Wash Basin Tap - Matt Black",
  price: "RM 980.00",
  colors: ["#D81B60", "#BDB6A2", "#000000"],
  code: "MDGR4FE/A",
  images: [
    "/product/basintap.png",
    "/product/sideview.png",
    "/product/topview.png",
  ],
  info: `Designed by Apple to complement iPhone 16 Plus, the Silicone Case with MagSafe is a delightful way to protect your iPhone. Made with a 55 percent recycled silicone material, the case has a silky, soft-touch finish on the exterior that feels great in your hand. And on the inside, there’s a soft microfiber lining for even more protection. This case works seamlessly with Camera Control. It features a sapphire crystal coupled to a conductive layer to communicate finger movements to the Camera Control. With built-in magnets that align perfectly with iPhone 16 Plus, this case offers a magical attach experience and faster wireless charging, every time.`,
  material: "55% Recycled Silicone",
  size: [
    { label: "Height", value: "6.5 inches (165 mm)" },
    { label: "Width", value: "3.2 inches (81 mm)" },
    { label: "Depth", value: "0.5 inches (12 mm)" },
  ],
};

const relatedProducts = [
  {
    name: "Wash Basin Tap - Matt Black",
    price: "RM 980.00",
    colors: ["#FFD700", "#BDB6A2", "#000000"],
    image: "/product/basintap.png",
  },
  {
    name: "Wash Basin Tap - Matt Black",
    price: "RM 980.00",
    colors: ["#FFD700", "#BDB6A2", "#000000"],
    image: "/product/basintap.png",
  },
  {
    name: "Wash Basin Tap - Matt Black",
    price: "RM 980.00",
    colors: ["#FFD700", "#BDB6A2", "#000000"],
    image: "/product/basintap.png",
  },
];

export default function ProductDetailsPage() {
  const [showCode, setShowCode] = useState(true);
  const [showInfo, setShowInfo] = useState(true);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);

  // Define image sets for each color
  const imageSets = [
    ["/product/basintap.png", "/product/sideview.png", "/product/topview.png"],
    ["/product/gold.png", "/product/goldtop.png", "/product/goldside.png"],
    ["/product/basintap.png", "/product/sideview.png", "/product/topview.png"],
  ];
  const images = imageSets[selectedColorIdx] || imageSets[0];

  const handleThumbnailClick = (idx: number) => {
    if (idx !== selectedImageIdx) {
      setIsTransitioning(true);
      setTimeout(() => {
        setSelectedImageIdx(idx);
        setIsTransitioning(false);
      }, 300);
    }
  };

  const handleColorClick = (idx: number) => {
    setSelectedColorIdx(idx);
    setSelectedImageIdx(0); // Reset to first image when color changes
  };

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-10">
        <Link
          href="/products"
          className="text-gray-500 text-lg mb-6 inline-block cursor-pointer hover:text-[#a52a2a] transition-colors"
        >
          ← Back
        </Link>
        <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
          <ProductImageGallery
            images={images}
            selectedImageIdx={selectedImageIdx}
            isTransitioning={isTransitioning}
            onThumbnailClick={handleThumbnailClick}
          />
          <ProductInfo
            name={mockProduct.name}
            price={mockProduct.price}
            colors={mockProduct.colors}
            code={mockProduct.code}
            info={mockProduct.info}
            material={mockProduct.material}
            size={mockProduct.size}
            showCode={showCode}
            setShowCode={setShowCode}
            showInfo={showInfo}
            setShowInfo={setShowInfo}
            selectedColorIdx={selectedColorIdx}
            onColorClick={handleColorClick}
          />
        </div>
        <hr className="my-4 border-gray-300" />
        {/* You may also like */}
        <RelatedProducts relatedProducts={relatedProducts} />
      </div>
      <Footer />
    </>
  );
}

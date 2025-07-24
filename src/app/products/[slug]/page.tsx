"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import useSWR from "swr";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductImageGallery from "@/components/product/ProductImageGallery";
import ProductInfo from "@/components/product/ProductInfo";
import RelatedProducts from "@/components/product/RelatedProducts";

interface ProductType {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  colorOptions: { name: string; hex: string; images: string[]; code: string }[];
  material: string;
  size: { label: string; value: string }[];
  category: string;
  tags: string;
}

interface RelatedProduct {
  name: string;
  price: string;
  colors: string[];
  image: string;
  slug: string;
}

const fetcher = async (
  url: string
): Promise<{
  product: ProductType | null;
  relatedProducts: RelatedProduct[];
}> => {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }
  const { data } = await res.json();
  return data;
};

export default function ProductDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/product/slug/${slug}`,
    fetcher,
    { revalidateOnFocus: false }
  );

  useEffect(() => {
    if (error) {
      router.push("/products");
    }
  }, [error, router]);

  if (!data) {
    return (
      <>
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-10">
          <p className="text-center text-gray-500">Loading...</p>
        </div>
        <Footer />
      </>
    );
  }

  const { product, relatedProducts } = data;
  if (!product) {
    return (
      <>
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-10">
          <p className="text-center text-red-500">Product not found</p>
        </div>
        <Footer />
      </>
    );
  }

  const imageSets = product.colorOptions.map((option) =>
    option.images.map((img) => (img.startsWith("/") ? img : `/${img}`))
  );

  const handleThumbnailClick = (idx: number) => {
    if (idx !== selectedImageIdx) {
      setIsTransitioning(true);
      setTimeout(() => {
        setSelectedImageIdx(idx);
        setIsTransitioning(false);
      }, 300);
    }
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
            imageSets={imageSets}
            selectedImageIdx={selectedImageIdx}
            isTransitioning={isTransitioning}
            onThumbnailClick={handleThumbnailClick}
            selectedColorIdx={selectedColorIdx}
            setSelectedColorIdx={setSelectedColorIdx}
            setSelectedImageIdx={setSelectedImageIdx}
          />
          <ProductInfo
            name={product.name}
            price={`RM ${product.price.toFixed(2)}`}
            colors={product.colorOptions.map((option) => option.hex)}
            colorNames={product.colorOptions.map((option) => option.name)}
            code={product.colorOptions[selectedColorIdx]?.code || "N/A"}
            info={product.description}
            material={product.material}
            size={product.size}
            onColorChange={setSelectedColorIdx}
          />
        </div>
        <hr className="my-4 border-gray-300" />
        <RelatedProducts relatedProducts={relatedProducts} />
      </div>
      <Footer />
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BathroomHeroSection from "@/components/BathroomHeroSection";
import ProductFilters from "@/components/ProductFilters";
import ProductGrid from "@/components/ProductGrid";

interface ProductGridProduct {
  image: string;
  name: string;
  price: string;
  colors: string[];
  slug: string;
}

const fetcher = async (url: string): Promise<ProductGridProduct[]> => {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  const { data } = await res.json();
  return data;
};

export default function ProductListPage() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || undefined;
  const tag = searchParams.get("tag") || undefined;
  const [sortBy, setSortBy] = useState(
    searchParams.get("sortBy") || "createdAt"
  );
  const [order, setOrder] = useState(searchParams.get("order") || "desc");
  const [search, setSearch] = useState(searchParams.get("search") || "");

  // Build query string for SWR
  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (tag && !tag.startsWith("Explore All")) params.set("tag", tag);
  params.set("sortBy", sortBy);
  params.set("order", order);
  if (search) params.set("search", search);

  const {
    data: products = [],
    error,
    isLoading,
  } = useSWR<ProductGridProduct[]>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/product?${params.toString()}`,
    fetcher,
    { revalidateOnFocus: false, dedupingInterval: 1000 }
  );

  // Update URL without navigation
  useEffect(() => {
    const newParams = new URLSearchParams();
    if (category) newParams.set("category", category);
    if (tag && !tag.startsWith("Explore All")) newParams.set("tag", tag);
    newParams.set("sortBy", sortBy);
    newParams.set("order", order);
    if (search) newParams.set("search", search);

    window.history.replaceState(null, "", `/products?${newParams.toString()}`);
  }, [sortBy, order, search, category, tag]);

  return (
    <>
      <Navbar />
      <div className="bg-[#f7f7fa] min-h-screen">
        <BathroomHeroSection />
        <main className="pt-8 pb-16">
          <div className="max-w-7xl mx-auto px-40 py-8">
            <ProductFilters
              tag={tag && !tag.startsWith("Explore All") ? tag : undefined}
              onSortChange={(newSortBy, newOrder) => {
                setSortBy(newSortBy);
                setOrder(newOrder);
              }}
              onSearch={setSearch}
            />
            {isLoading ? (
              <p className="text-center text-gray-500">Loading products...</p>
            ) : error ? (
              <p className="text-center text-red-500">
                Error loading products. Please try again later.
              </p>
            ) : products.length === 0 ? (
              <p className="text-center text-gray-500">No products found.</p>
            ) : (
              <ProductGrid products={products} />
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

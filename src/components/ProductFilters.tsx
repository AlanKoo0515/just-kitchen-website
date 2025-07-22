"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const tabs = [
  { label: "Newest", sortBy: "createdAt", order: "desc" },
  { label: "Most Popular", sortBy: "popularity", order: "desc" }, // Placeholder
  { label: "Low Price to High", sortBy: "price", order: "asc" },
  { label: "High Price to Low", sortBy: "price", order: "desc" },
];

interface ProductFiltersProps {
  tag?: string;
}

export default function ProductFilters({ tag }: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(0);
  const [search, setSearch] = useState(searchParams.get("search") || "");

  // Sync activeTab with URL sort parameters
  useEffect(() => {
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const order = searchParams.get("order") || "desc";
    const tabIndex = tabs.findIndex(
      (tab) => tab.sortBy === sortBy && tab.order === order
    );
    setActiveTab(tabIndex !== -1 ? tabIndex : 0);
    setSearch(searchParams.get("search") || "");
  }, [searchParams]);

  const handleTabClick = (idx: number) => {
    setActiveTab(idx);
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sortBy", tabs[idx].sortBy);
    newParams.set("order", tabs[idx].order);
    router.push(`/products?${newParams.toString()}`);
  };

  const handleSearch = (q: string) => {
    setSearch(q);
    const newParams = new URLSearchParams(searchParams);
    if (q) {
      newParams.set("search", q);
    } else {
      newParams.delete("search");
    }
    router.push(`/products?${newParams.toString()}`);
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 w-full">
      {/* Left: Dynamic Tag */}
      <div className="flex-1 flex items-center md:justify-start justify-center">
        <span className="font-semibold text-gray-800 mr-2 text-2xl">
          {tag || "All Products"}
        </span>
      </div>
      {/* Center: Tabs */}
      <div className="flex-1 flex items-center justify-center gap-6 whitespace-nowrap">
        {tabs.map((tab, idx) => (
          <button
            key={tab.label}
            className={`text-xs md:text-sm px-2 py-1 border-b-2 transition-colors duration-150 ${
              activeTab === idx
                ? "border-[#b23a2b] text-[#b23a2b] font-bold"
                : "border-transparent text-gray-500 hover:text-[#b23a2b]"
            }`}
            onClick={() => handleTabClick(idx)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {/* Right: Search */}
      <div className="flex-1 flex md:justify-end justify-end">
        <div
          className="flex items-center rounded py-1 w-full max-w-[260px] justify-end"
          style={{ background: "#f7f7fa" }}
        >
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" strokeWidth="2" />
            <path strokeWidth="2" strokeLinecap="round" d="M21 21l-2-2" />
          </svg>
          <input
            type="text"
            placeholder={`Search ${tag || "products"}`}
            className="outline-none text-sm bg-transparent px-2 py-1 w-[150px]"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import useSWR from "swr";

interface Category {
  category: string;
  tags: { name: string; icon: string }[];
}

const fetcher = (url: string) =>
  fetch(url, { cache: "no-store" }).then((res) =>
    res.json().then((d) => d.data)
  );

export default function CategoryGrid() {
  const { data: categories = [], error } = useSWR<Category[]>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/category`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0,
      dedupingInterval: 60000, // Prevent rapid re-fetches
    }
  );
  const scrollRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [scrollStates, setScrollStates] = useState<
    { canScrollLeft: boolean; canScrollRight: boolean }[]
  >(categories.map(() => ({ canScrollLeft: false, canScrollRight: false })));

  const checkScrollPosition = (index: number) => {
    const container = scrollRefs.current[index];
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      const canScrollLeft = scrollLeft > 0;
      const canScrollRight = scrollLeft < scrollWidth - clientWidth - 1;

      setScrollStates((prev) => {
        if (
          prev[index]?.canScrollLeft !== canScrollLeft ||
          prev[index]?.canScrollRight !== canScrollRight
        ) {
          const newStates = [...prev];
          newStates[index] = { canScrollLeft, canScrollRight };
          return newStates;
        }
        return prev; // Avoid unnecessary state updates
      });
    }
  };

  const scroll = (direction: "left" | "right", index: number) => {
    const container = scrollRefs.current[index];
    if (container) {
      const scrollAmount = 300;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    // Initialize scroll states only when categories change
    setScrollStates(
      categories.map(() => ({ canScrollLeft: false, canScrollRight: false }))
    );

    // Set up scroll listeners
    const scrollListeners = scrollRefs.current.map((container, index) => {
      if (container) {
        const handleScroll = () => checkScrollPosition(index);
        container.addEventListener("scroll", handleScroll);
        // Trigger initial scroll check after render
        setTimeout(() => checkScrollPosition(index), 0);
        return () => container.removeEventListener("scroll", handleScroll);
      }
      return () => {};
    });

    return () => {
      scrollListeners.forEach((cleanup) => cleanup());
    };
  }, [categories]);

  if (error) {
    return <div>Error loading categories. Please try again later.</div>;
  }

  return (
    <section className="max-w-7xl mx-auto py-12 px-4">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 drop-shadow-xl">
        Discover by Categories
      </h2>
      <p className="text-center text-gray-500 mb-8 italic">
        We have a wide range of categories to choose from!
      </p>
      <div className="space-y-8">
        {categories.map((cat, index) => {
          const canScrollLeft = scrollStates[index]?.canScrollLeft ?? false;
          const canScrollRight = scrollStates[index]?.canScrollRight ?? false;

          return (
            <div key={cat.category} className="relative">
              <h3 className="font-semibold text-lg mb-4 text-gray-700">
                {cat.category}
              </h3>
              <div className="relative group flex items-center min-h-[140px]">
                {canScrollLeft && (
                  <button
                    onClick={() => scroll("left", index)}
                    className="absolute left-0 top-1/3 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-lg rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <svg
                      className="w-5 h-5 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                )}
                {canScrollRight && (
                  <button
                    onClick={() => scroll("right", index)}
                    className="absolute right-0 top-1/3 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-lg rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <svg
                      className="w-5 h-5 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                )}
                <div
                  ref={(el) => {
                    scrollRefs.current[index] = el;
                  }}
                  className="flex gap-9 overflow-x-auto pb-4 scrollbar-hide px-4 w-full"
                >
                  {cat.tags.map((item, itemIndex) => (
                    <Link
                      key={`${cat.category}-${item.name}-${itemIndex}`}
                      href={`/products?category=${encodeURIComponent(
                        cat.category
                      )}&tag=${encodeURIComponent(item.name)}`}
                      className="flex flex-col items-center text-center min-w-[120px]"
                    >
                      <Image
                        src={item.icon}
                        alt={item.name}
                        width={120}
                        height={120}
                        className="object-contain mb-2"
                      />
                      <span className="text-md text-gray-700">{item.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

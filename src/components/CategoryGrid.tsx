"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";

const categories = [
  {
    title: "Bathroom Accessories",
    items: [
      { name: "Basin Cabinet", icon: "/logo.jpg" },
      { name: "Toilet Bowl", icon: "/logo.jpg" },
      { name: "Shower Set", icon: "/logo.jpg" },
      { name: "Bathtub & Jacuzzi", icon: "/logo.jpg" },
      { name: "Mirror", icon: "/logo.jpg" },
      { name: "Shelf", icon: "/logo.jpg" },
      { name: "Basin Tap", icon: "/logo.jpg" },
      { name: "Grab Bar", icon: "/logo.jpg" },
      { name: "Grab Bar", icon: "/logo.jpg" },
      { name: "Grab Bar", icon: "/logo.jpg" },
      { name: "Grab Bar", icon: "/logo.jpg" },
      { name: "Grab Bar", icon: "/logo.jpg" },
      { name: "Grab Bar", icon: "/logo.jpg" },
    ],
  },
  {
    title: "Kitchen Accessories",
    items: [
      { name: "Hood", icon: "/logo.jpg" },
      { name: "Hob", icon: "/logo.jpg" },
      { name: "Oven", icon: "/logo.jpg" },
      { name: "Kitchen Sink", icon: "/logo.jpg" },
      { name: "Sink Tap", icon: "/logo.jpg" },
      { name: "Pull-Out Basket", icon: "/logo.jpg" },
    ],
  },
  {
    title: "Smart Home",
    items: [{ name: "Smart Lock", icon: "/logo.jpg" }],
  },
];

export default function CategoryGrid() {
  const scrollRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [scrollStates, setScrollStates] = useState<
    { canScrollLeft: boolean; canScrollRight: boolean }[]
  >([]);

  const checkScrollPosition = (index: number) => {
    const container = scrollRefs.current[index];
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      const canScrollLeft = scrollLeft > 0;
      const canScrollRight = scrollLeft < scrollWidth - clientWidth - 1; // -1 for rounding errors

      setScrollStates((prev) => {
        const newStates = [...prev];
        newStates[index] = { canScrollLeft, canScrollRight };
        return newStates;
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
    // Initialize scroll states
    const initialStates = categories.map((_, index) => {
      const container = scrollRefs.current[index];
      if (container) {
        const { scrollLeft, scrollWidth, clientWidth } = container;
        return {
          canScrollLeft: scrollLeft > 0,
          canScrollRight: scrollLeft < scrollWidth - clientWidth - 1,
        };
      }
      return { canScrollLeft: false, canScrollRight: false };
    });
    setScrollStates(initialStates);

    // Add scroll event listeners
    const scrollListeners = scrollRefs.current.map((container, index) => {
      if (container) {
        const handleScroll = () => checkScrollPosition(index);
        container.addEventListener("scroll", handleScroll);
        return () => container.removeEventListener("scroll", handleScroll);
      }
      return () => {};
    });

    return () => {
      scrollListeners.forEach((cleanup) => cleanup());
    };
  }, []);

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
            <div key={cat.title} className="relative">
              <h3 className="font-semibold text-lg mb-4 text-gray-700">
                {cat.title}
              </h3>
              <div className="relative group flex items-center min-h-[140px]">
                {/* Left Arrow */}
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

                {/* Right Arrow */}
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
                  {cat.items.map((item, itemIndex) => (
                    <div
                      key={`${cat.title}-${item.name}-${itemIndex}`}
                      className="flex flex-col items-center text-center min-w-[120px]"
                    >
                      <Image
                        src={item.icon}
                        alt={item.name}
                        width={120}
                        height={120}
                        className="object-contain mb-2"
                      />
                      <span className="text-md md:text-md text-gray-700">
                        {item.name}
                      </span>
                    </div>
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

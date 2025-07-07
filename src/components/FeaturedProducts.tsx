"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";

const featured = [
  {
    name: "Bathtub",
    image: "/featured/bathtub.png",
    description: "Evaluate your kitchen & bath. Every piece, purposely",
  },
  {
    name: "Basin Cabinet",
    image: "/featured/basincabinet.png",
    description: "Evaluate your kitchen & bath. Every piece, purposely",
  },
  {
    name: "Shower",
    image: "/featured/shower.png",
    description: "Evaluate your kitchen & bath. Every piece, purposely",
  },
  {
    name: "Bathtub",
    image: "/featured/bathtub.png",
    description: "Evaluate your kitchen & bath. Every piece, purposely",
  },
  {
    name: "Basin Cabinet",
    image: "/featured/basincabinet.png",
    description: "Evaluate your kitchen & bath. Every piece, purposely",
  },
  {
    name: "Shower",
    image: "/featured/shower.png",
    description: "Evaluate your kitchen & bath. Every piece, purposely",
  },
];

export default function FeaturedProducts() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScrollPosition = () => {
    const container = scrollRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const scroll = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (container) {
      const scrollAmount = 400;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      checkScrollPosition();
      container.addEventListener("scroll", checkScrollPosition);
      return () => container.removeEventListener("scroll", checkScrollPosition);
    }
  }, []);

  return (
    <section className="max-w-7xl mx-auto py-12 px-4">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 drop-shadow-xl">
        Featured Product
      </h2>
      <p className="text-center text-gray-500 mb-8 italic">
        Handpicked favourites that define modern luxury living
      </p>
      <div className="relative group">
        {/* Left Arrow */}
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-[10px] top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-lg rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <svg
              className="w-8 h-8 text-gray-600"
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
            onClick={() => scroll("right")}
            className="absolute right-[10px] top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-lg rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <svg
              className="w-8 h-8 text-gray-600"
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
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide px-4"
        >
          {featured.map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              className="relative rounded-xl overflow-hidden shadow-md group w-[400px] h-[500px] flex-shrink-0"
            >
              <Image
                src={item.image}
                alt={item.name}
                width={400}
                height={500}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex flex-col justify-between p-6">
                <h3 className="text-white text-3xl font-semibold drop-shadow-lg">
                  {item.name}
                </h3>
                <p className="text-white text-sm drop-shadow-lg">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

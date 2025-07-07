"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";

const navLinks = [
  { name: "Bathroom Accessories", key: "bathroom" },
  { name: "Kitchen Accessories", key: "kitchen" },
  { name: "Smart Home", key: "smart" },
];

const catalogues = {
  bathroom: {
    title: "Explore Bathroom Accessories",
    items: [
      "Explore All Bathroom Accessories",
      "Basin Cabinet",
      "Bathtub & Jacuzzi",
      "Basin Tap",
      "Floor Drainer",
      "Grab Bar",
      "Hand Bidet",
      "Mirror",
      "Shelf",
      "Shower Set",
      "Toilet Bowl",
      "Tower Bar",
    ],
  },
  kitchen: {
    title: "Explore Kitchen Accessories",
    items: [
      "Explore All Kitchen Accessories",
      "Hood",
      "Hob",
      "Oven",
      "Kitchen Sink",
      "Sink Tap",
      "Pull-Out Basket",
    ],
  },
  smart: {
    title: "Explore Smart Home",
    items: [
      "Explore All Smart Home",
      "Smart Lock",
      "Smart Switch",
      "Smart Sensor",
      "Smart Camera",
    ],
  },
};

export default function Navbar() {
  const [active, setActive] = useState<string | null>(null);
  const [hovering, setHovering] = useState(false);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLUListElement>(null);

  // Close dropdown with delay if not hovering
  useEffect(() => {
    if (!active) return;
    if (!hovering) {
      hoverTimeout.current = setTimeout(() => {
        setActive(null);
      }, 100);
    } else if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
      hoverTimeout.current = null;
    }
    return () => {
      if (hoverTimeout.current) {
        clearTimeout(hoverTimeout.current);
        hoverTimeout.current = null;
      }
    };
  }, [hovering, active]);

  return (
    <header className="sticky top-0 z-30 bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto flex items-center justify-center px-4 py-3 relative">
        <div className="flex items-center gap-3 pr-10">
          <Image
            src="/logo.jpg"
            alt="Just Kitchen & Bath Logo"
            width={48}
            height={48}
            className="rounded shadow-lg"
          />
          <span className="font-bold text-lg tracking-tight text-[#811200] drop-shadow-xl">
            Just Kitchen & Bath
          </span>
        </div>
        <ul
          className="hidden md:flex gap-8 text-sm font-medium"
          ref={navRef}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          {navLinks.map((link) => (
            <li
              key={link.key}
              className="relative"
              onMouseEnter={() => setActive(link.key)}
            >
              <button
                onClick={() => setActive(link.key)}
                className={`hover:text-[#a52a2a] transition-colors px-2 py-1 focus:outline-none bg-transparent border-none ${
                  active === link.key ? "text-[#a52a2a]" : ""
                }`}
              >
                {link.name}
              </button>
            </li>
          ))}
        </ul>
        {/* Dropdown overlay and catalogue */}
        {active && (
          <>
            {/* Fullscreen blur overlay except navbar */}
            <div className="fixed left-0 top-[64px] w-screen h-[calc(100vh-64px)] z-30 bg-white/70 backdrop-blur-md transition-all duration-300" />
            {/* Dropdown catalogue */}
            <div
              className="fixed left-0 top-[64px] w-screen h-[340px] z-40"
              style={{ pointerEvents: "auto" }}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
            >
              <div
                ref={dropdownRef}
                className="mx-auto px-[600px] py-8 shadow-lg rounded-b-xl bg-white/90 relative animate-fadeInDown"
                style={{
                  marginTop: 0,
                  minHeight: 260,
                }}
              >
                <button
                  className="absolute top-4 right-4 text-gray-400 hover:text-[#a52a2a] text-2xl font-bold focus:outline-none"
                  onClick={() => setActive(null)}
                  aria-label="Close catalogue dropdown"
                >
                  ×
                </button>
                <div className="text-xs text-gray-500 mb-2">
                  {catalogues[active as keyof typeof catalogues]?.title}
                </div>
                <ul>
                  {catalogues[active as keyof typeof catalogues]?.items.map(
                    (item) => (
                      <li
                        key={item}
                        className="font-medium text-[20px] mb-1 text-black cursor-pointer hover:text-[#a52a2a] transition-colors"
                        onClick={() => setActive(null)}
                      >
                        {item}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </>
        )}
      </nav>
      <style jsx global>{`
        @keyframes fadeInDown {
          0% {
            opacity: 0;
            transform: translateY(-24px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInDown {
          animation: fadeInDown 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </header>
  );
}

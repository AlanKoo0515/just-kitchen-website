"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

interface CatalogueTag {
  category: string;
  tags: string[];
}

interface NavLink {
  name: string;
  key: string;
}

export default function Navbar() {
  const [navLinks, setNavLinks] = useState<NavLink[]>([]);
  const [catalogues, setCatalogues] = useState<
    Record<string, { category: string; tags: string[] }>
  >({});
  const [active, setActive] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLUListElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  // Fetch categories and tags
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/category", {
          cache: "no-store", // Ensure fresh data
        });
        if (!res.ok) throw new Error("Failed to fetch categories");
        const { data }: { data: CatalogueTag[] } = await res.json();

        const navLinks: NavLink[] = data.map((cat) => ({
          name: cat.category,
          key: cat.category.toLowerCase().replace(/\s+/g, "-"), // e.g., "Bathroom Accessories" -> "bathroom-accessories"
        }));

        const catalogues: Record<string, { category: string; tags: string[] }> =
          data.reduce(
            (acc, cat) => ({
              ...acc,
              [cat.category.toLowerCase().replace(/\s+/g, "-")]: {
                category: `Explore ${cat.category}`,
                tags: cat.tags,
              },
            }),
            {}
          );

        setNavLinks(navLinks);
        setCatalogues(catalogues);
      } catch (error) {
        console.error("Error fetching categories:", error);
        // Optionally set fallback data or show an error state
      }
    }
    fetchCategories();
  }, []);

  // Handle mouse enter/leave for smooth fade animations
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        setActive(null);
      }, 300); // Wait for fade-out animation to complete
    }, 100); // Small delay before starting fade-out
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-white/50 backdrop-blur-md shadow-sm">
      <nav className="max-w-7xl mx-auto flex items-center justify-center px-4 py-3 relative">
        <div className="flex items-center gap-3 pr-10">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => router.push("/")}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === "Enter" || e.key === " ") router.push("/");
            }}
            aria-label="Go to home page"
          >
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
        </div>
        <ul
          className="hidden md:flex gap-8 text-sm font-medium"
          ref={navRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {navLinks.map((link) => (
            <li
              key={link.key}
              className="relative"
              onMouseEnter={() => {
                setActive(link.key);
                handleMouseEnter();
              }}
            >
              <button
                onClick={() => setActive(link.key)}
                className={`hover:text-[#a52a2a] transition-colors px-2 py-1 focus:outline-none bg-transparent border-none cursor-pointer ${
                  active === link.key ? "text-[#a52a2a]" : ""
                }`}
              >
                {link.name}
              </button>
            </li>
          ))}
        </ul>
        {(active || isVisible) && catalogues[active as string] && (
          <>
            <div
              className={`fixed left-0 top-[64px] w-screen h-[calc(100vh-64px)] z-30 bg-white/70 backdrop-blur-md transition-opacity duration-300 ease-in-out ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
              style={{ pointerEvents: isVisible ? "auto" : "none" }}
            />
            <div
              className="fixed left-0 top-[64px] w-screen h-[340px] z-40"
              style={{ pointerEvents: isVisible ? "auto" : "none" }}
              onMouseEnter={isVisible ? handleMouseEnter : undefined}
              onMouseLeave={isVisible ? handleMouseLeave : undefined}
            >
              <div
                ref={dropdownRef}
                className={`mx-auto px-[600px] py-8 shadow-lg rounded-b-xl bg-white/50 backdrop-blur-md relative transition-all duration-300 ease-in-out ${
                  isVisible
                    ? "opacity-100 transform translate-y-0"
                    : "opacity-0 transform -translate-y-4"
                }`}
                style={{
                  marginTop: 0,
                  minHeight: 260,
                }}
              >
                <div className="text-xs text-gray-500 mb-2">
                  {catalogues[active as string]?.category}
                </div>
                <ul>
                  {catalogues[active as string]?.tags.map((item) => (
                    <li
                      key={item}
                      className="font-medium text-[20px] mb-1 text-black cursor-pointer hover:text-[#a52a2a] transition-colors"
                      onClick={() => {
                        const category = catalogues[
                          active as string
                        ].category.replace("Explore ", "");
                        const query =
                          item === `Explore All ${category}`
                            ? `category=${encodeURIComponent(category)}`
                            : `category=${encodeURIComponent(
                                category
                              )}&tag=${encodeURIComponent(item)}`;
                        router.push(`/products?${query}`);
                      }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}
      </nav>
      <style jsx global>{`
        .transition-opacity {
          transition-property: opacity;
        }
        .transition-transform {
          transition-property: transform;
        }
        .duration-300 {
          transition-duration: 300ms;
        }
        .ease-in-out {
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </header>
  );
}

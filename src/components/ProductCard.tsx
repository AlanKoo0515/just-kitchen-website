"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  image: string;
  name: string;
  price: string;
  colors: string[];
  slug: string;
  features: string[]; // Added
  type: string; // Replaced size
  onClick?: () => void;
}

export default function ProductCard({
  image,
  name,
  price,
  colors,
  slug,
  // features, // Not displayed, but included in props
  // type, // Not displayed, but included in props
  onClick,
}: ProductCardProps) {
  const router = useRouter();

  const validImage =
    image && typeof image === "string"
      ? image.startsWith("/")
        ? image
        : `/${image}`
      : "/placeholder.png";

  if (!image || typeof image !== "string") {
    console.warn(`Invalid image for product "${name}":`, image);
  }

  return (
    <button
      type="button"
      onClick={onClick || (() => router.push(`/products/${slug}`))}
      className="bg-[#ededed] rounded-2xl p-6 flex flex-col items-center w-full h-96 transition-shadow hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#bdb6a2] cursor-pointer"
      style={{ minWidth: 220 }}
    >
      <div className="w-44 h-64 flex items-center justify-center mb-4">
        <Image
          src={validImage}
          alt={name}
          width={350}
          height={350}
          className="object-contain"
        />
      </div>
      <div className="flex gap-2 mb-6">
        {colors.map((color, idx) => (
          <span
            key={idx}
            className="w-4 h-4 rounded-full border border-gray-300"
            style={{
              background: color,
              boxShadow: "inset 0 1px 4px rgba(0,0,0,0.25)",
            }}
          />
        ))}
      </div>
      <div className="text-lg font-semibold text-black text-center mb-2">
        {name}
      </div>
      <div className="text-sm text-gray-700 text-center">{price}</div>
    </button>
  );
}

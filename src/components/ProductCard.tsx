import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  name: string;
  price: string;
  colors?: string[];
  onClick?: () => void;
}

export default function ProductCard({
  name,
  price,
  colors = ["#FFD700", "#BDB6A2", "#000000"],
  onClick,
}: ProductCardProps) {
  const router = useRouter();
  const slug = name.toLowerCase().replace(/\s+/g, "-");

  return (
    <button
      type="button"
      onClick={onClick || (() => router.push(`/products/${slug}`))}
      className="bg-[#ededed] rounded-2xl p-6 flex flex-col items-center w-full h-96 transition-shadow hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#bdb6a2] cursor-pointer"
      style={{ minWidth: 220 }}
    >
      <div className="w-44 h-64 flex items-center justify-center mb-4">
        <Image
          src="/product/basintap.png"
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

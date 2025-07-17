import Image from "next/image";

interface RelatedProduct {
  name: string;
  price: string;
  colors: string[];
  image: string;
}

export default function RelatedProducts({
  relatedProducts,
}: {
  relatedProducts: RelatedProduct[];
}) {
  return (
    <div className="mt-16">
      <h2 className="text-3xl font-bold mb-8 text-center">You may also like</h2>
      <div className="flex gap-8 justify-center">
        {relatedProducts.map((prod, idx) => (
          <div
            key={idx}
            className="bg-[#ededed] rounded-2xl p-6 flex flex-col items-center w-64 cursor-pointer transition-transform duration-300 hover:scale-105"
          >
            <Image
              src={prod.image}
              alt={prod.name}
              width={180}
              height={180}
              className="object-contain mb-4"
            />
            <div className="flex gap-2 mb-4">
              {prod.colors.map((color, cidx) => (
                <span
                  key={cidx}
                  className="w-4 h-4 rounded-full border border-gray-300"
                  style={{ background: color }}
                />
              ))}
            </div>
            <div className="text-base font-semibold text-black text-center mb-1">
              {prod.name}
            </div>
            <div className="text-sm text-gray-700 text-center">
              {prod.price}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

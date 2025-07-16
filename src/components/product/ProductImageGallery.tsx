import Image from "next/image";

interface ProductImageGalleryProps {
  images: string[];
  selectedImageIdx: number;
  isTransitioning: boolean;
  onThumbnailClick: (idx: number) => void;
}

export default function ProductImageGallery({
  images,
  selectedImageIdx,
  isTransitioning,
  onThumbnailClick,
}: ProductImageGalleryProps) {
  return (
    <div className="flex flex-col">
      <div className="bg-[#ededed] rounded-2xl flex items-center justify-center p-6 overflow-hidden relative">
        <Image
          src={images[selectedImageIdx]}
          alt="Product main image"
          width={400}
          height={400}
          className={`object-contain transition-all duration-300 ease-in-out ${
            isTransitioning
              ? "opacity-0 scale-95 -translate-x-10"
              : "opacity-100 scale-100 translate-x-0"
          }`}
        />
      </div>
      <div className="flex gap-4 mt-2 justify-start items-center">
        {images.map((img, idx) => (
          <button
            key={img}
            className={`w-20 h-20 bg-[#ededed] rounded-xl flex items-center justify-center cursor-pointer focus:outline-none border-2 transition-all duration-300 ${
              selectedImageIdx === idx
                ? "border-[#a52a2a] scale-105"
                : "border-transparent scale-100 opacity-80"
            } hover:scale-105 hover:opacity-100`}
            onClick={() => onThumbnailClick(idx)}
            tabIndex={0}
            aria-label={`View product image ${idx + 1}`}
          >
            <Image
              src={img}
              alt={`thumbnail-${idx + 1}`}
              width={50}
              height={50}
              className={`transition-all duration-300 ${
                selectedImageIdx === idx
                  ? "opacity-100 scale-100"
                  : "opacity-80 scale-95"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

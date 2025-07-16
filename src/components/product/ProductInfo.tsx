import { FaAngleUp } from "react-icons/fa";

interface ProductInfoProps {
  name: string;
  price: string;
  colors: string[];
  code: string;
  info: string;
  material: string;
  size: { label: string; value: string }[];
  showCode: boolean;
  setShowCode: (v: boolean) => void;
  showInfo: boolean;
  setShowInfo: (v: boolean) => void;
  selectedColorIdx: number;
  onColorClick: (idx: number) => void;
}

export default function ProductInfo({
  name,
  price,
  colors,
  code,
  info,
  material,
  size,
  showCode,
  setShowCode,
  showInfo,
  setShowInfo,
  selectedColorIdx,
  onColorClick,
}: ProductInfoProps) {
  return (
    <div>
      <h1 className="text-6xl font-bold mb-2">{name}</h1>
      <div className="text-2xl mb-16">{price}</div>
      <div className="mb-16">
        <span className="font-medium text-2xl">Colour - Matt Black</span>
        <div className="flex gap-4 mt-6">
          {colors.map((color, idx) => (
            <span
              key={idx}
              className={`w-10 h-10 rounded-full border border-gray-300 cursor-pointer transition-transform duration-300 hover:scale-110 ${
                selectedColorIdx === idx
                  ? "ring-2 ring-[#a52a2a] border-[#a52a2a]"
                  : ""
              }`}
              style={{
                background: color,
                boxShadow: "inset 0 1px 4px rgba(0,0,0,0.25)",
              }}
              onClick={() => onColorClick(idx)}
            />
          ))}
        </div>
      </div>
      <hr className="my-4 border-gray-300" />
      {/* Collapsible Product Code Section */}
      <div className="mb-4">
        <button
          className="flex items-center w-full justify-between font-semibold text-2xl focus:outline-none"
          onClick={() => setShowCode(!showCode)}
          aria-expanded={showCode}
        >
          Product Code
          <span
            className={`transition-transform ml-2 cursor-pointer text-gray-600 hover:text-gray-900 ${
              showCode ? "rotate-180" : "rotate-0"
            }`}
          >
            <FaAngleUp />
          </span>
        </button>
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            showCode ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0 mt-0"
          }`}
        >
          <div className="text-sm text-gray-700">{code}</div>
        </div>
      </div>
      <hr className="my-4 border-gray-300" />
      {/* Collapsible Product Information Section */}
      <div className="mb-4">
        <button
          className="flex items-center w-full justify-between font-semibold text-2xl focus:outline-none"
          onClick={() => setShowInfo(!showInfo)}
          aria-expanded={showInfo}
        >
          Product Information
          <span
            className={`transition-transform ml-2 cursor-pointer text-gray-600 hover:text-gray-900 ${
              showInfo ? "rotate-180" : "rotate-0"
            }`}
          >
            <FaAngleUp />
          </span>
        </button>
        <div
          className={`transition-all duration-400 ease-in-out overflow-hidden ${
            showInfo ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0 mt-0"
          }`}
        >
          <div className="mb-4 text-sm text-gray-700 whitespace-pre-line">
            {info}
          </div>
        </div>
      </div>
      <div className="mb-2 font-semibold">Material</div>
      <div className="mb-4 text-sm text-gray-700">{material}</div>
      <div className="mb-2 font-semibold">Size</div>
      <ul className="mb-4 text-sm text-gray-700">
        {size.map((s, idx) => (
          <li key={idx}>
            {s.label}: {s.value}
          </li>
        ))}
      </ul>
    </div>
  );
}

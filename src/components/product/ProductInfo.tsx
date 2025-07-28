"use client";

import { useState } from "react";
import { FaAngleUp } from "react-icons/fa";

interface ProductInfoProps {
  name: string;
  price: string;
  colors: string[];
  colorNames: string[];
  code: string;
  info: string;
  material: string;
  type: string; // Replaced size
  features: string[]; // Added
  onColorChange?: (idx: number) => void;
}

export default function ProductInfo({
  name,
  price,
  colors,
  colorNames,
  code,
  info,
  material,
  type, // Replaced size
  features, // Added
  onColorChange,
}: ProductInfoProps) {
  const [showCode, setShowCode] = useState(true);
  const [showInfo, setShowInfo] = useState(true);
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);

  const handleColorClick = (idx: number) => {
    setSelectedColorIdx(idx);
    onColorChange?.(idx);
  };

  return (
    <div>
      <h1 className="text-6xl font-bold mb-2">
        {name} - {code}
      </h1>
      <div className="text-2xl mb-16">{price}</div>
      <div className="mb-16">
        <span className="font-medium text-2xl">
          Colour - {colorNames[selectedColorIdx] || "Default"}
        </span>
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
              onClick={() => handleColorClick(idx)}
              title={colorNames[idx]}
            />
          ))}
        </div>
      </div>
      <hr className="my-4 border-gray-300" />
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
          <div className="mb-2 font-semibold">Features</div>
          <ul className="mb-4 text-sm text-gray-700 list-disc pl-5">
            {features.map((feature, idx) => (
              <li key={idx}>{feature}</li>
            ))}
          </ul>
          <div className="mb-2 font-semibold">Material</div>
          <div className="mb-4 text-sm text-gray-700">{material}</div>
          <div className="mb-2 font-semibold">Type</div>
          <div className="mb-4 text-sm text-gray-700">{type}</div>
        </div>
      </div>
    </div>
  );
}

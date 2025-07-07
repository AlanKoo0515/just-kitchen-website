"use client";

import Image from "next/image";

const partners = [
  { name: "Banca", logo: "/partners/banca.png" },
  { name: "Docasa", logo: "/partners/docasa.png" },
  { name: "FOTILE", logo: "/partners/fotile.png" },
  { name: "Hafele", logo: "/partners/hafele.png" },
  { name: "JohnsonSuisse", logo: "/partners/js.png" },
  { name: "Livinox", logo: "/partners/livinox.png" },
  { name: "Modern Depot", logo: "/partners/md.png" },
  { name: "Rinnai", logo: "/partners/rinnai.png" },
  { name: "ROBAM", logo: "/partners/robam.png" },
  { name: "TAGPIN", logo: "/partners/tagpin.png" },
];

export default function Partnerships() {
  // Duplicate the array for seamless looping
  const displayPartners = [...partners, ...partners];

  return (
    <section className="max-w-7xl mx-auto py-12 px-4">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 drop-shadow-xl">
        Partnerships
      </h2>
      <p className="text-center text-gray-500 mb-8 italic">
        Chosen by Designers, Loved by Homeowners
      </p>
      <div className="overflow-hidden">
        <div className="flex items-center gap-8 animate-partner-scroll w-max">
          {displayPartners.map((p, idx) => (
            <Image
              key={`${p.name}-${idx}`}
              src={p.logo}
              alt={p.name}
              width={200}
              height={200}
              className="h-20 md:h-32 object-contain partner-logo"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative w-full h-[540px] md:h-[620px] flex items-start justify-end overflow-hidden bg-gray-100 p-12">
      <Image
        src="/herobg.jpeg"
        alt="Bathroom Hero Background"
        fill
        className="object-cover object-center z-0"
        style={{ filter: "brightness(0.85)" }}
        priority
      />
      <div className="relative z-10 text-right">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg bg-gradient-to-r from-[#b23a2b] to-[#fff0f3] bg-clip-text text-transparent">
          Live inspired.
          <br />
          Curate with Purpose.
        </h1>
      </div>
    </section>
  );
}

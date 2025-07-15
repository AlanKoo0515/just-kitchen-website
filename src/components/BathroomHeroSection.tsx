import Image from "next/image";

export default function BathroomHeroSection() {
  return (
    <section className="relative w-full h-[540px] md:h-[620px] flex items-start justify-end overflow-hidden bg-gray-100 p-12">
      <Image
        src="/bathroombg.png"
        alt="Bathroom Hero Background"
        fill
        className="object-cover object-center z-0"
        style={{ filter: "brightness(0.85)" }}
        priority
      />
      <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
        <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg tracking-wide text-center w-full">
          Bathroom
        </h1>
      </div>
    </section>
  );
}

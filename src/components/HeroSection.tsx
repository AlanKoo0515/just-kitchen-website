export default function HeroSection() {
  return (
    <section className="relative w-full h-[340px] md:h-[420px] flex items-center justify-center overflow-hidden bg-gray-100">
      <img
        src="/hero-bg.jpg"
        alt="Bathroom Hero Background"
        className="absolute inset-0 w-full h-full object-cover object-center z-0"
        style={{ filter: "brightness(0.85)" }}
      />
      <div className="relative z-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[#b23a2b] mb-4 drop-shadow-lg">
          Live inspired.
          <br />
          Curate with Purpose.
        </h1>
      </div>
    </section>
  );
}

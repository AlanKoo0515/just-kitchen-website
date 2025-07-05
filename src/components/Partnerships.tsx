const partners = [
  { name: "Docasa", logo: "/partners/docasa.png" },
  { name: "JohnsonSuisse", logo: "/partners/johnsonsuisse.png" },
  { name: "FOTILE", logo: "/partners/fotile.png" },
  { name: "Modern Depot", logo: "/partners/md.png" },
  { name: "TAGPIN", logo: "/partners/tagpin.png" },
  { name: "ROBAM", logo: "/partners/robam.png" },
];

export default function Partnerships() {
  return (
    <section className="max-w-7xl mx-auto py-12 px-4">
      <h2 className="text-xl md:text-2xl font-bold text-center mb-2">
        Partnerships
      </h2>
      <p className="text-center text-gray-500 mb-8">
        Chosen by Designers, Loved by Homeowners
      </p>
      <div className="flex flex-wrap justify-center items-center gap-8">
        {partners.map((p) => (
          <img
            key={p.name}
            src={p.logo}
            alt={p.name}
            className="h-10 md:h-12 object-contain grayscale hover:grayscale-0 transition"
          />
        ))}
      </div>
    </section>
  );
}

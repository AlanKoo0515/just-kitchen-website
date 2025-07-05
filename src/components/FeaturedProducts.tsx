const featured = [
  {
    name: "Bathtub",
    image: "/featured/bathtub.jpg",
    description: "Evaluate your kitchen & bath. Every piece, purposely",
  },
  {
    name: "Basin Cabinet",
    image: "/featured/basin-cabinet.jpg",
    description: "Evaluate your kitchen & bath. Every piece, purposely",
  },
  {
    name: "Shower",
    image: "/featured/shower.jpg",
    description: "Evaluate your kitchen & bath. Every piece, purposely",
  },
];

export default function FeaturedProducts() {
  return (
    <section className="max-w-7xl mx-auto py-12 px-4">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
        Featured Product
      </h2>
      <p className="text-center text-gray-500 mb-8">
        Handpicked favourites that define modern luxury living
      </p>
      <div className="grid md:grid-cols-3 gap-6">
        {featured.map((item) => (
          <div
            key={item.name}
            className="relative rounded-xl overflow-hidden shadow-md group"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-6">
              <h3 className="text-white text-2xl font-semibold mb-2 drop-shadow-lg">
                {item.name}
              </h3>
              <p className="text-white text-sm drop-shadow-lg">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const categories = [
  {
    title: "Bathroom Accessories",
    items: [
      { name: "Basin Cabinet", icon: "/categories/basin-cabinet.png" },
      { name: "Toilet Bowl", icon: "/categories/toilet-bowl.png" },
      { name: "Shower Set", icon: "/categories/shower-set.png" },
      { name: "Bathtub & Jacuzzi", icon: "/categories/bathtub.png" },
      { name: "Mirror", icon: "/categories/mirror.png" },
      { name: "Shelf", icon: "/categories/shelf.png" },
      { name: "Basin Tap", icon: "/categories/basin-tap.png" },
      { name: "Grab Bar", icon: "/categories/grab-bar.png" },
    ],
  },
  {
    title: "Kitchen Accessories",
    items: [
      { name: "Hood", icon: "/categories/hood.png" },
      { name: "Hob", icon: "/categories/hob.png" },
      { name: "Oven", icon: "/categories/oven.png" },
      { name: "Kitchen Sink", icon: "/categories/kitchen-sink.png" },
      { name: "Sink Tap", icon: "/categories/sink-tap.png" },
      { name: "Pull-Out Basket", icon: "/categories/pull-out-basket.png" },
    ],
  },
  {
    title: "Smart Home",
    items: [{ name: "Smart Lock", icon: "/categories/smart-lock.png" }],
  },
];

export default function CategoryGrid() {
  return (
    <section className="max-w-7xl mx-auto py-12 px-4">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
        Discover by Categories
      </h2>
      <p className="text-center text-gray-500 mb-8">
        We have a wide range of categories to choose from!
      </p>
      <div className="grid md:grid-cols-3 gap-8">
        {categories.map((cat) => (
          <div key={cat.title}>
            <h3 className="font-semibold text-lg mb-4 text-gray-700">
              {cat.title}
            </h3>
            <div className="grid grid-cols-4 gap-4">
              {cat.items.map((item) => (
                <div
                  key={item.name}
                  className="flex flex-col items-center text-center"
                >
                  <img
                    src={item.icon}
                    alt={item.name}
                    className="w-12 h-12 object-contain mb-2"
                  />
                  <span className="text-xs md:text-sm text-gray-700">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

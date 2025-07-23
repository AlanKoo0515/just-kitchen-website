import ProductCard from "./ProductCard";

interface Product {
  image: string;
  name: string;
  price: string;
  colors: string[];
  slug: string;
}

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {products.map((product, idx) => (
        <ProductCard
          key={idx}
          image={product.image}
          name={product.name}
          price={product.price}
          colors={product.colors}
          slug={product.slug}
        />
      ))}
    </div>
  );
}

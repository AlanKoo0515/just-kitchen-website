import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BathroomHeroSection from "@/components/BathroomHeroSection";
import ProductFilters from "@/components/ProductFilters";
import ProductGrid from "@/components/ProductGrid";

interface ProductGridProduct {
  image: string;
  name: string;
  price: string;
  colors: string[];
}

async function fetchProducts(
  category?: string,
  tag?: string,
  sortBy: string = "createdAt",
  order: string = "desc",
  search?: string
): Promise<ProductGridProduct[]> {
  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (tag && !tag.startsWith("Explore All")) params.set("tag", tag);
  params.set("sortBy", sortBy);
  params.set("order", order);
  if (search) params.set("search", search);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/product?${params.toString()}`,
    {
      cache: "no-store", // Ensure fresh data
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const { data } = await res.json();
  return data as ProductGridProduct[];
}

export default async function ProductListPage({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string;
    tag?: string;
    sortBy?: string;
    order?: string;
    search?: string;
  }>;
}) {
  const {
    category,
    tag,
    sortBy = "createdAt",
    order = "desc",
    search,
  } = await searchParams; // Await searchParams
  const products = await fetchProducts(category, tag, sortBy, order, search);

  return (
    <>
      <Navbar />
      <div className="bg-[#f7f7fa] min-h-screen">
        <BathroomHeroSection />
        <main className="pt-8 pb-16">
          <div className="max-w-7xl mx-auto px-40 py-8">
            <ProductFilters
              tag={tag && !tag.startsWith("Explore All") ? tag : undefined}
            />
            {products.length === 0 ? (
              <p className="text-center text-gray-500">No products found.</p>
            ) : (
              <ProductGrid products={products} />
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

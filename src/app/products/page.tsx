import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ProductListPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#f7f7fa] pt-8 pb-16">
        {/* TODO: Replace with actual product grid and filters */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Product List Page</h1>
          <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
            Product grid and filters will go here.
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

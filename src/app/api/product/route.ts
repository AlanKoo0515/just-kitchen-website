import { NextRequest, NextResponse } from "next/server";
import { Product, ProductType } from "@/models/product"; // Import ProductType
import connectDb from "@/lib/mongodb";

interface ProductGridProduct {
  image: string;
  name: string;
  price: string;
  colors: string[];
}

interface QueryCondition {
  [key: string]: { $regex: string; $options: string };
}

export async function GET(request: NextRequest) {
  await connectDb();
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || undefined;
    const tag = searchParams.get("tag") || undefined;
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const order = searchParams.get("order") || "desc";
    const search = searchParams.get("search") || undefined;

    const query: { category?: string; tags?: string; $or?: QueryCondition[] } =
      {};
    if (category) query.category = category;
    if (tag && !tag.startsWith("Explore All")) query.tags = tag;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const sort: Record<string, 1 | -1> = {};
    if (sortBy === "price") {
      sort.price = order === "asc" ? 1 : -1;
    } else {
      sort.createdAt = order === "desc" ? -1 : 1;
    }

    const products = (await Product.find(query)
      .sort(sort)
      .lean()) as unknown as ProductType[];

    const formattedProducts: ProductGridProduct[] = products.map((product) => ({
      image: product.colorOptions[0]?.images[0] || "/placeholder.png",
      name: product.name,
      price: `RM ${product.price.toFixed(2)}`,
      colors: product.colorOptions.map((option) => option.hex),
    }));

    return NextResponse.json({ status: 200, data: formattedProducts });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      error: "Failed to fetch products",
      status: 500,
    });
  }
}

// POST handler remains unchanged
export async function POST(request: NextRequest) {
  await connectDb();
  try {
    const {
      name,
      slug,
      description,
      price,
      colorOptions,
      material,
      size,
      category,
      tags,
    } = await request.json();
    if (
      !name ||
      !slug ||
      !description ||
      !price ||
      !colorOptions ||
      !material ||
      !size ||
      !category ||
      !tags
    ) {
      return NextResponse.json({
        error: "All product fields are required",
        status: 400,
      });
    }
    const addProduct = new Product({
      name,
      slug,
      description,
      price,
      colorOptions,
      material,
      size,
      category,
      tags,
    });
    await addProduct.save();
    return NextResponse.json({ data: addProduct }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      error: "Failed to create product",
      status: 400,
    });
  }
}

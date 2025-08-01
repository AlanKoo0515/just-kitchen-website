import { NextRequest, NextResponse } from "next/server";
import { Product } from "@/models/product";
import connectDb from "@/lib/mongodb";

interface ProductGridProduct {
  image: string;
  name: string;
  price: string;
  colors: string[];
  slug: string;
  features: string[];
  type: string;
}

interface QueryCondition {
  [key: string]: { $regex: string; $options: string };
}

interface ColorOption {
  name: string;
  hex: string;
  images: string[];
  code: string;
}

export async function GET(request: NextRequest) {
  await connectDb();
  try {
    const productCount = await Product.countDocuments();
    console.log(`Total products in database: ${productCount}`);

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

    console.log("Product query:", query);

    const sort: Record<string, 1 | -1> = {};
    if (sortBy === "price") {
      sort.price = order === "asc" ? 1 : -1;
    } else {
      sort.createdAt = order === "desc" ? -1 : 1;
    }

    const products = await Product.find(query).sort(sort).lean();

    console.log("Found products:", products);

    const formattedProducts: ProductGridProduct[] = products.map((product) => {
      const rawImage = product.colorOptions[0]?.images[0] || "/placeholder.png";
      const image = rawImage.startsWith("/") ? rawImage : `/${rawImage}`;
      if (!product.colorOptions[0]?.images[0]) {
        console.warn(
          `No valid image for product "${product.name}" (slug: ${product.slug})`
        );
      }
      return {
        image,
        name: product.name,
        price: `RM ${product.price.toFixed(2)}`,
        colors: product.colorOptions.map((option: ColorOption) => option.hex),
        slug: product.slug,
        features: product.features || [], // Fallback for missing features
        type: product.type,
      };
    });

    return NextResponse.json({ status: 200, data: formattedProducts });
  } catch (error) {
    console.error("Error in /api/product:", error);
    return NextResponse.json({
      error: "Failed to fetch products",
      status: 500,
    });
  }
}

export async function POST(request: NextRequest) {
  await connectDb();
  try {
    const {
      name,
      slug,
      description,
      price,
      features,
      colorOptions,
      material,
      type,
      category,
      tags,
    } = await request.json();
    console.log("Received POST data:", {
      name,
      slug,
      description,
      price,
      features,
      colorOptions,
      material,
      type,
      category,
      tags,
    });
    if (
      !name ||
      !slug ||
      !description ||
      !price ||
      !features ||
      !colorOptions ||
      !material ||
      !type ||
      !category ||
      !tags
    ) {
      return NextResponse.json({
        error: "All product fields are required",
        status: 400,
      });
    }
    // Remove slug modification to use provided slug
    const addProduct = new Product({
      name,
      slug,
      description,
      price,
      features,
      colorOptions,
      material,
      type,
      category,
      tags,
    });
    await addProduct.save();
    console.log("Created product:", addProduct);
    return NextResponse.json({ data: addProduct }, { status: 200 });
  } catch (error) {
    console.error("Error in /api/product POST:", error);
    return NextResponse.json({
      error: "Failed to create product",
      status: 400,
    });
  }
}

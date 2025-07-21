import { NextRequest, NextResponse } from "next/server";
import { Product } from "@/models/product";
import connectDb from "@/lib/mongodb";

export async function GET() {
  await connectDb();
  try {
    const fetchProducts = await Product.find({});
    return NextResponse.json({ status: 200, data: fetchProducts });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "Failed to fetch products",
      status: 400,
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
    console.log(error);
    return NextResponse.json({
      error: "Failed to create product",
      status: 400,
    });
  }
}

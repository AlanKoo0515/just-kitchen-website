import { NextResponse } from "next/server";
import { Product } from "@/models/product";
import connectDb from "@/lib/mongodb";

export async function GET() {
  await connectDb();
  try {
    const categories = await Product.aggregate([
      {
        $group: {
          _id: "$category",
          tags: { $addToSet: "$tags" }, // Collect unique tags for each category
        },
      },
      {
        $project: {
          category: "$_id",
          tags: {
            $concatArrays: [
              [{ $concat: ["Explore All ", "$_id"] }], // Properly format "Explore All [Category]"
              "$tags",
            ],
          },
          _id: 0,
        },
      },
    ]);

    return NextResponse.json({ status: 200, data: categories });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      error: "Failed to fetch categories",
      status: 500,
    });
  }
}

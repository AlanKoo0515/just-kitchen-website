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
          tags: { $addToSet: "$tags" },
        },
      },
      {
        $project: {
          category: "$_id",
          tags: {
            $concatArrays: [[{ $concat: ["Explore All ", "$_id"] }], "$tags"],
          },
          _id: 0,
        },
      },
    ]);

    const categoriesWithIcons = await Promise.all(
      categories.map(async (cat: { category: string; tags: string[] }) => {
        const tagsWithIcons = await Promise.all(
          cat.tags.map(async (tag: string) => {
            const product = await Product.findOne({ tags: tag }).lean();
            return {
              name: tag,
              icon: product?.colorOptions[0]?.images[0]
                ? `/${
                    product.colorOptions[0].images[0].startsWith("/")
                      ? product.colorOptions[0].images[0].slice(1)
                      : product.colorOptions[0].images[0]
                  }`
                : "/placeholder.png",
            };
          })
        );
        return {
          category: cat.category,
          tags: tagsWithIcons,
        };
      })
    );

    return NextResponse.json({ status: 200, data: categoriesWithIcons });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      error: "Failed to fetch categories",
      status: 500,
    });
  }
}

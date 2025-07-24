import { NextRequest, NextResponse } from "next/server";
import { Product, ProductType } from "@/models/product";
import connectDb from "@/lib/mongodb";

interface RelatedProduct {
  name: string;
  price: string;
  colors: string[];
  image: string;
  slug: string;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  await connectDb();
  try {
    const { slug } = await params;

    const product = (await Product.findOne({
      slug,
    }).lean()) as ProductType | null;

    const relatedProducts: RelatedProduct[] = product
      ? await Product.aggregate([
          {
            $match: {
              category: product.category,
              tags: product.tags,
              slug: { $ne: slug },
            },
          },
          { $sample: { size: 6 } },
          {
            $project: {
              name: 1,
              price: 1,
              colorOptions: 1,
              slug: 1,
            },
          },
        ]).then((products: ProductType[]) =>
          products.map((p) => ({
            name: p.name,
            price: `RM ${p.price.toFixed(2)}`,
            colors: p.colorOptions.map((option) => option.hex),
            image: p.colorOptions[0]?.images[0]
              ? `/${
                  p.colorOptions[0].images[0].startsWith("/")
                    ? p.colorOptions[0].images[0].slice(1)
                    : p.colorOptions[0].images[0]
                }`
              : "/placeholder.png",
            slug: p.slug, // Uses updated slug
          }))
        )
      : [];

    return NextResponse.json({
      status: 200,
      data: { product, relatedProducts },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      error: "Failed to fetch product",
      status: 500,
    });
  }
}

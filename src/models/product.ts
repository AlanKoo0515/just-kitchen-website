import { model, Schema, models, InferSchemaType } from "mongoose";

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  colorOptions: {
    type: [
      {
        name: { type: String, required: true },
        hex: { type: String, required: true },
        images: { type: [String], required: true },
        code: { type: String, required: true },
      },
    ],
    required: true,
  },
  material: {
    type: String,
    required: true,
  },
  size: {
    type: [
      {
        label: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  tags: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Export the inferred type
export type ProductType = InferSchemaType<typeof productSchema> & {
  _id: string;
};

export const Product = models.Product || model("Product", productSchema);

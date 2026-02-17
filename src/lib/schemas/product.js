import z from "zod";

const productSchema = z.object({
  name: z.string(),
  brand: z.string().optional(),
  category: z.string().optional(),
  price: z
    .string({
      error: (value) =>
        value === undefined
          ? "Product price is required."
          : "Price must be number.",
    })
    .min(1)
    .max(9999999),
  stock: z.number().min(1).optional(),
  imageUrls: z.array(z.string()).optional(),
  description: z.string().optional(),
});

export { productSchema };

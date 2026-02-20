import z from "zod";

const productSchema = z.object({
  name: z.string({ error: "Product name is required." }).min(2),
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
  stock: z.string("Stock must be number.").optional(),
  imageUrls: z.array(z.string()).optional(),
});

export { productSchema };

import z from "zod";

const productSchema = z.object({
    name: z.string(),
    brand: z.string().optional(),
    category: z.string().optional(),
    price: z.number().min(1).max(999999999),
    stock: z.number().min(1).optional(),
    imageUrls: z.array(z.string()).optional(),
    description: z.string().optional()

})

export { productSchema }
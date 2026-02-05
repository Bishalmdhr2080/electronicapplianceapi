import z from "zod";
import { userSchema } from "./user.js";

const loginSchema = z.object({
    email: z.string().optional(),
    password: z.string(),
    phone: z.string()
        .min(6, "phone number must be more that 6 digit")
        .max(10, "Phone number must be at most 10 digits")
        .optional(),
})
    .refine(
        (data) => data.email || data.phone,
        {
            message: "Either email or phone is required",
            path: ["email"], // where the error shows (optional)
        }
    );

const registerSchema = userSchema;

export { loginSchema, registerSchema }


import z from "zod";
import { ROLE_ADMIN, ROLE_MERCHANT, ROLE_USER } from "../../constants/roles.js";


const addressSchema = z.object({
    city: z.string().optional(),
    province: z.string().optional(),
    country: z.string()

})

const userSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
    phone: z.string()
        .min(6, "phone number must be more that 6 digit")
        .max(10, "Phone number must be at most 10 digits"),
    address: addressSchema,
    isActive: z.boolean().optional(),
    roles: z.array(z.enum(["ROLE_ADMIN", "ROLE_USER", "ROLE_MERCHANT"])).optional(),
    profileImageUrl: z.string().optional()
});

export { userSchema }
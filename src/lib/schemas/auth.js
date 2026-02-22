import z from "zod";
import { userSchema } from "./user.js";

const loginSchema = z.object({
  email: z.email(),
  password: z.string(),
});

const registerSchema = userSchema;

const forgetPasswordSchema = z.object({
  email: z.email(),
});

const resetPasswordSchema = z.object({
  password: z.string(),
});

export {
  loginSchema,
  registerSchema,
  forgetPasswordSchema,
  resetPasswordSchema,
};

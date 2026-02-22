import express from "express";
import authController from "../controller/auth.controller.js";
import validate from "../middleware/validator.js";
import {
  forgetPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
} from "../lib/schemas/auth.js";

const router = express.Router();

router.post("/register", validate(registerSchema), authController.register);

router.post("/login", validate(loginSchema), authController.login);

router.post(
  "/reset-password",
  validate(resetPasswordSchema),
  authController.resetPassword,
);

router.post(
  "/forget-password",
  validate(forgetPasswordSchema),
  authController.forgetPassword,
);

export default router;

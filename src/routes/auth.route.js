import express from "express"
import authController from "../controller/auth.controller.js"
import { validate } from "../middleware/validator.js"
import { loginSchema, registerSchema } from "../lib/schemas/auth.js"

const router = express.Router()

router.post("/register", validate(registerSchema), authController.register)

router.post("/login", validate(loginSchema), authController.login)

export default router

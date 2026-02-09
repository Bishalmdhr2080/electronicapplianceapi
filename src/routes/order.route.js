import express from "express";
import orderController from "../controller/order.controller.js";
import auth from "../middleware/auth.js";
import roleBaseAuth from "../middleware/roleBasedAuth.js";
import { ROLE_USER } from "../constants/roles.js";

const router = express.Router();


router.post("/", auth, roleBaseAuth(ROLE_USER), orderController.createOrder)


export default router
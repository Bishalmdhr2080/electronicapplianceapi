import express from "express";
import orderController from "../controller/order.controller.js";
import auth from "../middleware/auth.js";
import roleBaseAuth from "../middleware/roleBasedAuth.js";
import { ROLE_ADMIN, ROLE_USER } from "../constants/roles.js";
import validate from "../middleware/validator.js";
import { orderSchema, orderStatusSchema } from "../lib/schemas/order.js";

const router = express.Router();

router.post(
  "/",
  auth,
  roleBaseAuth(ROLE_USER),
  validate(orderSchema),
  orderController.createOrder,
);

router.get("/", auth, roleBaseAuth(ROLE_ADMIN), orderController.getOrders);

router.get(
  "/user",
  auth,
  roleBaseAuth(ROLE_USER),
  orderController.getOrdersByUser,
);

router.get("/:id", auth, roleBaseAuth(ROLE_USER), orderController.getOrderById);

//url:/user/:id
//method:GET
router.get(
  "/user/:id",
  auth,
  roleBaseAuth(ROLE_USER),
  orderController.getOrdersByUser,
);

//url:/api/orders/:id/cancel
//method:PUT
router.put("/:id/cancel", auth, orderController.cancelOrder);

//url:/:id/delet
//method:DELET
router.delete(
  "/:id",
  auth,
  roleBaseAuth(ROLE_ADMIN),
  orderController.deletOrder,
);

router.put(
  "/:id/status",
  auth,
  roleBaseAuth(ROLE_ADMIN),
  validate(orderStatusSchema),
  orderController.updateOrderStatus,
);

//url:api/orders/:id/payment/khalti
//method:post
router.post(
  "/:id/payment/khalti",
  auth,
  roleBaseAuth(ROLE_USER),
  orderController.orderPaymentViaKhalti,
);

router.post(
  "/:id/payment/cash",
  auth,
  roleBaseAuth(ROLE_USER),
  orderController.orderPaymentViaCash,
);

router.put(
  "/:id/confirm-payment",
  auth,
  roleBaseAuth(ROLE_USER),
  orderController.comfirmOrderPayment,
);
export default router;

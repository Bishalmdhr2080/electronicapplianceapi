import express from "express";
import orderController from "../controller/order.controller.js";
import roleBaseAuth from "../middleware/roleBasedAuth.js";
import { ROLE_ADMIN, ROLE_MERCHANT, ROLE_USER } from "../constants/roles.js";
import validate from "../middleware/validator.js";
import { orderSchema, orderStatusSchema } from "../lib/schemas/order.js";

const router = express.Router();

router.post(
  "/",
  roleBaseAuth(ROLE_USER),
  validate(orderSchema),
  orderController.createOrder,
);

router.get("/", roleBaseAuth(ROLE_ADMIN), orderController.getOrders);

router.get("/user", roleBaseAuth(ROLE_USER), orderController.getOrdersByUser);

router.get(
  "/merchant",
  roleBaseAuth(ROLE_MERCHANT),
  orderController.getOrdersByMerchant,
);

router.get("/:id", roleBaseAuth(ROLE_USER), orderController.getOrderById);

//url:/user/:id
//method:GET
router.get(
  "/user/:id",
  roleBaseAuth(ROLE_USER),
  orderController.getOrdersByUser,
);

//url:/api/orders/:id/cancel
//method:PUT
router.put("/:id/cancel", orderController.cancelOrder);

//url:/:id/delet
//method:DELET
router.delete("/:id", roleBaseAuth(ROLE_ADMIN), orderController.deletOrder);

router.put(
  "/:id/status",
  roleBaseAuth(ROLE_ADMIN),
  validate(orderStatusSchema),
  orderController.updateOrderStatus,
);

//url:api/orders/:id/payment/khalti
//method:post
router.post(
  "/:id/payment/khalti",
  roleBaseAuth(ROLE_USER),
  orderController.orderPaymentViaKhalti,
);

router.post(
  "/:id/payment/cash",
  roleBaseAuth(ROLE_USER),
  orderController.orderPaymentViaCash,
);

router.put(
  "/:id/confirm-payment",
  roleBaseAuth(ROLE_USER),
  orderController.comfirmOrderPayment,
);
export default router;

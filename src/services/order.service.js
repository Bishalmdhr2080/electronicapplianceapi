import {
  ORDER_STATUS_CANCELLED,
  ORDER_STATUS_CONFIRMED,
} from "../constants/order.js";
import { ROLE_ADMIN } from "../constants/roles.js";
import Order from "../models/Order.js";
import Payment from "../models/Payment.js";
import crypto from "crypto";
import { paymentViaKhalti } from "../utils/payment.js";

const createOrder = async (data, userId) => {
  const orderNumber = crypto.randomUUID();
  console.log(orderNumber);

  return await Order.create({ ...data, user: userId, orderNumber });
};

const getOrders = async () => {
  return await Order.find()
    .populate("user", "name email phone")
    .populate("orderItems.product", "name brand category price imageUrls");
};

const getOrdersByUser = async (userId) => {
  return await Order.find({ user: userId })
    .sort({ createdAt: -1 })
    .populate("user", "name email phone")
    .populate("orderItems.product", "name brand category price imageUrls");
};

const getOrderById = async (id) => {
  const order = await Order.findById(id)
    .populate("user", "name email phone")
    .populate("orderItems.product", "name brand category price imageUrls");

  if (!order) throw { status: 400, message: "order not found" };

  return order;
};

const cancelOrder = async (id, user) => {
  const order = await getOrderById(id);

  if (!user.roles.includes(ROLE_ADMIN) && order.user._id != user._id)
    throw {
      status: 400,
      message: "Access denied",
    };

  return await Order.findByIdAndUpdate(
    id,
    { status: ORDER_STATUS_CANCELLED },
    { new: true },
  );
};

const deletOrder = async (id) => {
  await getOrderById(id);

  return await Order.findByIdAndDelete(id);
};

const updateOrderStatus = async (id, status) => {
  return await Order.findByIdAndUpdate(id, { status }, { new: true });
};

const orderPaymentViaKhalti = async (id) => {
  const order = await getOrderById(id);

  const orderPayment = await Payment.create({
    method: "ONLINE",
    amount: order.totalPrice,
  });

  await Order.findByIdAndUpdate(id, {
    payment: orderPayment._id,
  });

  return await paymentViaKhalti({
    amount: order.totalPrice,
    purchaseOrderId: order.orderNumber,
    purchaseOrderName: order.orderItems[0].product.name,
    customer: order.user,
  });
};

const orderPaymentViaCash = async (id) => {
  const order = await getOrderById(id);

  const orderPayment = await Payment.create({
    method: "CASH",
    amount: order.totalPrice,
  });

  return await Order.findByIdAndUpdate(
    id,
    {
      payment: orderPayment._id,
      status: ORDER_STATUS_CONFIRMED,
    },
    { new: true },
  );
};

const comfirmOrderPayment = async (id, status) => {
  const order = await getOrderById(id);
  if (status.toUpperCase() !== "COMPLETED") {
    await Payment.findByIdAndUpdate(order.payment, { status: "FAILED" });
    throw {
      status: 400,
      message: "payment failed",
    };
  }
  await Payment.findByIdAndUpdate(order.payment, { status: "SUCCESS" });
  return await Order.findByIdAndUpdate(
    id,
    { status: ORDER_STATUS_CONFIRMED },
    { new: true },
  );
};

export default {
  createOrder,
  getOrders,
  getOrdersByUser,
  getOrderById,
  deletOrder,
  cancelOrder,
  updateOrderStatus,
  orderPaymentViaKhalti,
  comfirmOrderPayment,
  orderPaymentViaCash,
};

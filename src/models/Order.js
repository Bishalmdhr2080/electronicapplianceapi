import mongoose from "mongoose";
import {
  ORDER_STATUS_CANCELLED,
  ORDER_STATUS_CONFIRMED,
  ORDER_STATUS_DELIVERED,
  ORDER_STATUS_PENDING,
  ORDER_STATUS_SHIPPED,
} from "../constants/order.js";

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    required: [true, "user is required"],
    ref: "User",
  },

  orderItems: [
    {
      product: {
        type: mongoose.Schema.ObjectId,
        required: [true, "Product is required"],
        ref: "Product",
      },

      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],

  status: {
    type: String,
    default: ORDER_STATUS_PENDING,
    enum: [
      ORDER_STATUS_PENDING,
      ORDER_STATUS_CONFIRMED,
      ORDER_STATUS_SHIPPED,
      ORDER_STATUS_DELIVERED,
      ORDER_STATUS_CANCELLED,
    ],
  },

  shippingAddress: {
    city: {
      type: String,
      required: [true, "Shipping Address is Required"],
    },
    province: {
      type: String,
      required: [true, "Province is required "],
    },
    country: {
      type: String,
      default: "Nepal",
    },
  },

  totalPrice: {
    type: Number,
    required: [true, "Price Amount is Required"],
  },

  orderNumber: {
    type: String,
    required: [true, "Order Number is required"],
  },

  createdAt: {
    type: Date,
    default: Date.now(),
    immutable: true,
  },

  payment: {
    type: mongoose.Schema.ObjectId,
    ref: "Payment",
  },
});

const model = mongoose.model("Order", orderSchema);

export default model;

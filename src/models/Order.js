import mongoose from "mongoose";
import {
    ORDER_STATUS_CANCELLED,
    ORDER_STATUS_CONFIRMED,
    ORDER_STATUS_DELIVERY,
    ORDER_STATUS_PENDING,
    ORDER_STATUS_SHIPPED
} from "../constants/order.js";


const orderSchema = new mongoose.Schema({
    status: {
        type: String,
        default: ORDER_STATUS_PENDING,
        enum: [
            ORDER_STATUS_PENDING,
            ORDER_STATUS_CONFIRMED,
            ORDER_STATUS_SHIPPED,
            ORDER_STATUS_DELIVERY,
            ORDER_STATUS_CANCELLED
        ]
    },
    shippingAddress: {
        city: {
            type: String,
            required: [true, "Shipping Address is Required"]
        },
        province: {
            type: String,
            required: [true, "Province is required"]
        },
        country: {
            type: String,
            default: "Nepal"
        }
    },

    totalPrice: {
        type: Number,
        required: [true, "Price Amount is Required"]
    },
    orderNumber: {
        type: Number,
        required: [true, "Order Number is required"]
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        immutable: true,
    },

    orderItems: [{
        products: {
            type: mongoose.Schema.ObjectId,
            required: [true, "User is required"],
            ref: "Product",
        },
        quantity: {
            type: Number,
            default: 1
        },
        payment: {
            type: mongoose.Schema.ObjectId,
            required: [true, "Payment is required"],
            ref: "Payment"
        }

    }]

})

const model = mongoose.model("Order", orderSchema)

export default model
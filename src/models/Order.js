import mongoose from "mongoose";
import {
    ORDER_STATUS_CANCELLED,
    ORDER_STATUS_CONFIRMED,
    ORDER_STATUS_DELIVERY,
    ORDER_STATUS_PENDING,
    ORDER_STATUS_SHIPPED
} from "../constants/order";
import { required } from "zod/mini";
import { min } from "date-fns";


const orderSchema = mongoose.Schema({
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
        min: 1,
        required: [true, "Price Amount is Required"]
    },
    orderNumber: {
        type: Number,
        min: 1,
        required: [true, "Order Number is required"]
    }

})

export default orderSchema
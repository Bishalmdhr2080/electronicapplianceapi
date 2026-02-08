
import mongoose, { mongo } from "mongoose"
import { required } from "zod/mini"

const productSchema = mongoose.Schema({

    name: {
        type: String,
        required: [true, "product name is required"]
    },

    brand: String,

    category: String,

    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [1, "Number should be not less than 0"]
    },

    stock: {
        type: Number,
        min: 1,
        default: 0
    },

    imageUrls: [String],

    createdAt: {
        type: Date,
        default: Date.now(),
    },

    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Createdby user is required"]
    },
    description: {
        type: String,
    }


})

const model = mongoose.model("Product", productSchema)

export default model
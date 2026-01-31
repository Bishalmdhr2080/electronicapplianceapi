import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [
            true, "User Name is required"
        ]
    },

    email: {
        type: String,
        required: [true, "Email addres is required"],
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            message: "invalid email",
        },
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    roles: {
        type: [String],
        default: ["USER"],
        enum: ["ADMIN", "USER", "MERCHANT"],
    },
    phone: {
        type: String,
        required: [true, "Phone Number is required"],
        min: [6, "Not valid number"],
        max: [13, "Not valid number"]
    },

    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true,
    },

    profileImageUrl: {
        type: String,
    },

    address: {
        city: String,
        province: String,
        country: {
            type: String,
            default: "Nepal"
        },

        isActive: {
            type: Boolean,
            default: true
        }
    },
})
const model = mongoose.model("User", userSchema)

export default model;   
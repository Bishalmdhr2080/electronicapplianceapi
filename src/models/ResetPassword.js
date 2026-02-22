import mongoose from "mongoose";

const resetPasswordSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    required: [true, "User Id is required"],
    ref: "User",
  },
  token: {
    type: String,
    required: [true, "Reset Password token is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  expiresAt: {
    type: Date,
    default: Date.now() + 3600000,
  },
  isUsed: {
    type: Boolean,
    default: false,
  },
});

const model = mongoose.model("ResetPassword", resetPasswordSchema);

export default model;

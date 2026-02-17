import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  transctionId: String,
  
  amount: {
    type: Number,
    required: [true, "Payment amount is required ok"],
  },
  method: {
    type: String,
    required: [true, "Payment Method is required"],
    enum: ["CARD", "ONLINE", "CASH"],
  },
  status: {
    type: String,
    default: "PENDING",
    enum: ["PENDING", "SUCCESS", "FAILED"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    immutable: true,
  },
});

const model = mongoose.model("Payment", paymentSchema);

export default model;

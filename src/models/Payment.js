import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    transctionId: {
        type: String,
    }




})


const model = mongoose("Payment", paymentSchema)

export default model
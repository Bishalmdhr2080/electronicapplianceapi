import Order from "../models/Order.js"

const createOrder = async (data) => {
    if (!data) throw {
        message: "Order data is unavailble",
        status: 401,
    }
    return await Order.create(data)
}

export default { createOrder }
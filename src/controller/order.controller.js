import orderService from "../services/order.service.js"

const createOrder = async (req, res) => {
    const data = req.data;
    try {
        const createOrder = await orderService.createOrder(data)

        res.status(201).send(createOrder)

    } catch (error) {
        res.status(error.status || 500).send(error?.message)
    }
}
export default { createOrder }
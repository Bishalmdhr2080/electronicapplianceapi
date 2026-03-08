import orderService from "../services/order.service.js";

const createOrder = async (req, res) => {
  const data = req.data;
  console.log(data);
  try {
    const createOrder = await orderService.createOrder(data, req.user._id);

    res.status(201).send(createOrder);
  } catch (error) {
    res.status(error.status || 500).send(error?.message);
  }
};

const getOrders = async (req, res) => {
  try {
    const data = await orderService.getOrders();
    console.log(data);
    res.json(data);
  } catch (error) {
    res.status(400).send(error?.message);
  }
};

const getOrdersByUser = async (req, res) => {
  try {
    const data = await orderService.getOrdersByUser(req.user._id);
    console.log(req.user._id);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(error?.message);
  }
};

const getOrderById = async (req, res) => {
  try {
    const data = await orderService.getOrderById(req.params.id);
    res.status(201).json(data);
  } catch (error) {
    res.status(error.status || 40).send(error?.message);
  }
};

const getOrdersByMerchant = async (req, res) => {
  try {
    const data = await orderService.getOrdersByMerchant(req.user._id);
    console.log(req.user._id);
    res.status(201).json(data);
  } catch (error) {
    res.status(error.status || 400).send(error?.message);
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const data = await orderService.updateOrderStatus(
      req.params.id,
      req.body?.status,
    );
    console.log(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(error.status || 40).send(error?.message);
  }
};

const cancelOrder = async (req, res) => {
  try {
    const data = await orderService.cancelOrder(req.params.id, req.user);

    res.status(201).json(data);
  } catch (error) {
    res.status(error.status || 400).send(error?.message);
  }
};

const deletOrder = async (req, res) => {
  try {
    const data = await orderService.deletOrder(req.params.id);

    res.status(201).json(data);
  } catch (error) {
    res.status(error.status || 400).send(error?.message);
  }
};

const orderPaymentViaKhalti = async (req, res) => {
  try {
    const data = await orderService.orderPaymentViaKhalti(req.params.id);

    res.status(201).json(data);
  } catch (error) {
    res.status(error.status || 400).send(error?.message);
  }
};

const orderPaymentViaCash = async (req, res) => {
  try {
    const data = await orderService.orderPaymentViaCash(req.params.id);

    res.status(201).json(data);
  } catch (error) {
    res.status(error.status || 400).send(error?.message);
  }
};

const comfirmOrderPayment = async (req, res) => {
  if (!req.body?.status)
    return res.status(400).send("Payment status is required");
  try {
    const data = await orderService.comfirmOrderPayment(
      req.params.id,
      req.body.status,
    );

    res.status(201).json(data);
  } catch (error) {
    res.status(error.status || 400).send(error?.message);
  }
};

export default {
  createOrder,
  getOrders,
  getOrdersByUser,
  cancelOrder,
  deletOrder,
  getOrderById,
  updateOrderStatus,
  orderPaymentViaKhalti,
  comfirmOrderPayment,
  orderPaymentViaCash,
  getOrdersByMerchant,
};

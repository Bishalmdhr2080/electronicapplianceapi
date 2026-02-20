import productService from "../services/product.service.js";

const getProducts = async (req, res) => {
  const query = req.query;

  try {
    const data = await productService.getProducts(query);
    res.json(data);
  } catch (error) {
    res.status(error.status || 404).send(error.message);
  }
};

const getProductById = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await productService.getProductById(id);

    res.json(data);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
};

const deletProductById = async (req, res) => {
  try {
    const id = req.params.id;

    await productService.deletProductById(id);

    res.json({ message: "product deleted sucessfully", id });
  } catch (error) {
    res.status(error.status || 404).send(error?.message);
  }
};

const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await productService.updateProduct(
      req.params.id,
      req.body,
      req.files,
    );

    res.status(201).json(updatedProduct);
  } catch (error) {
    res.status(error.status || 400).send(error?.message);
  }
};

const createProduct = async (req, res) => {
  try {
    const createProduct = await productService.createProduct(
      req.body,
      req.files,
      req.user._id,
    );

    res.status(201).send(createProduct);
  } catch (error) {
    res.status(400).send(error?.message);
  }
};

export default {
  getProducts,
  getProductById,
  createProduct,
  deletProductById,
  updateProduct,
};

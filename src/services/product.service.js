import Product from "../models/Product.js";
import uploadFile from "../utils/fileUploader.js";

const getProducts = async (query) => {
  const { name, brand, category, min, max, limit, offset, createdBy } = query;

  const sort = query.sort ? JSON.parse(query.sort) : {};

  const filter = {};

  if (name) filter.name = { $regex: name, $options: "i" }; //i like match
  if (category) filter.category = category; //exact match
  if (brand) filter.brand = { $in: brand.split(",") }; //match items for array
  if (min) filter.price = { $gte: min };
  if (max) filter.price = { ...filter.price, $lte: max };
  if (createdBy) filter.createdBy = createdBy;

  const product = await Product.find(filter)
    .sort(sort)
    .limit(limit)
    .skip(offset);

  if (!product) {
    const error = new Error("product not found");
    error.status = 404;
    throw error;
  }

  return product;
};

const getProductById = async (id) => {
  const product = await Product.findById(id);
  if (!product)
    throw {
      message: "product not found",
      status: 404,
    };

  return product;
};

const deletProductById = async (id) => {
  await getProductById(id);
  await Product.findByIdAndDelete(id);
};

const updateProduct = async (id, data, files) => {
  const updateData = data;

  if (files && files.length > 0) {
    const uploadedFiles = await uploadFile(files);
    updateData.imageUrls = uploadedFiles.map((item) => item.url);
  }

  await getProductById(id);
  return await Product.findByIdAndUpdate(id, updateData, { new: true });
};

const createProduct = async (data, files, userId) => {
  const uploadedFiles = await uploadFile(files);
  const imageUrls = uploadedFiles.map((item) => item.url);

  if (!data)
    throw {
      message: "Product not found",
      status: 404,
    };
  return await Product.create({ ...data, imageUrls, createdBy: userId });
};



export default {
  getProducts,
  createProduct,
  getProductById,
  deletProductById,
  updateProduct,
};



import Product from "../models/Product.js"


const getProducts = async (query) => {

    const { name, brand, category, min, max, limit, offset } = query;

    const sort = query.sort ? JSON.parse(query.sort) : {};

    const filter = {};

    if (name) filter.name = { $regex: name, $options: "i" };//i like match
    if (category) filter.category = category; //exact match 
    if (brand) filter.brand = { $in: brand.split(',') }; //match items for array 
    if (min) filter.price = { $gte: min };
    if (max) filter.price = { ...filter.price, $lte: max };


    const product = await Product
        .find(filter)
        .sort(sort)
        .limit(limit)
        .skip(offset)

    if (!product) {
        const error = new Error("product not found")
        error.status = 404;
        throw error;
    }

    return product
}

const getProductById = async (id) => {
    const product = await Product.findById(id);
    if (!product) throw {
        message: "product not found",
        status: 404
    }

    return product
}

const deletProductById = async (id) => {
    await getProductById(id)
    await Product.findByIdAndDelete(id)
}

const updateProduct = async (id, data) => {
    await getProductById(id)
    return await Product.findByIdAndUpdate(id, data, { new: true })
}

const createProduct = async (data, userId) => {
    if (!data) throw {
        message: "Product not found",
        status: 404,
    }
    return await Product.create({ ...data, createdBy: userId })
}



export default {
    getProducts,
    createProduct,
    getProductById,
    deletProductById,
    updateProduct

}
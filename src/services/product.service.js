
import Product from "../models/Product.js"


const getProducts = async () => {
    const product = await Product.find()

    if (!product) throw {
        message: "product not found",
        status: 404
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

const createProduct = async (data) => {
    if (!data) throw {
        message: "Product not found",
        status: 404,
    }
    return await Product.create(data)
}



export default {
    getProducts,
    createProduct,
    getProductById,
    deletProductById,
    updateProduct

}
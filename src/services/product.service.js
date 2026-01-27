
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
    return await Product.findByIdAndUpdate(id, data, { new: true })
}



export default {
    getProducts,
    getProductById,
    deletProductById,
    updateProduct

}
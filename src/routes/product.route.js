import express from "express";
import productController from "../controller/product.controller.js";


const router = express.Router();

router.get("/", productController.getProducts);

router.get("/:id", productController.getProductById);

router.post("/", productController.createProduct)

router.delete("/:id", productController.deletProductById)

router.put("/:id", productController.updateProduct)



export default router





















// import express from "express";
// import getProducts from './../controller/product.controller';
// const router = express.Router()

// router.get("/api/products", (req, res) => {
//     res.json(['ram', 'shaym', 'hari'])
// })

// router.get("/api/products/name", (req, res) => {
//     res.json(['ram', 'shaym', 'hari', "kancha"])
// })



// export default router;
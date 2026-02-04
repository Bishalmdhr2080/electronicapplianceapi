import express from "express";
import productController from "../controller/product.controller.js";
import auth from "../middleware/auth.js";


const router = express.Router();

router.post("/", auth, productController.createProduct)

router.get("/", productController.getProducts);

router.get("/:id", productController.getProductById);

router.put("/:id", auth, productController.updateProduct)

router.delete("/:id", auth, productController.deletProductById)



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
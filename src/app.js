import auth from "./middleware/auth.js";
import authRoute from "./routes/auth.route.js";
import bodyParser from "body-parser";
import config from "./config/config.js";
import connectDB from "./config/database.js";
import express from "express";
import logger from "./middleware/logger.js";
import productRoute from "./routes/product.route.js";
import orderRoute from "./routes/order.route.js";
import roleBaseAuth from "./middleware/roleBasedAuth.js";
import userRoute from "./routes/user.route.js";
import { ROLE_ADMIN } from "./constants/roles.js";
import multer from "multer";
import connectCloudinary from "./config/cloudinary.js";
import uploadFile from "./utils/fileUploader.js";

const app = express();

const upload = multer({ storage: multer.memoryStorage() });

connectDB();

connectCloudinary();

app.use(bodyParser.json());

app.use(logger);

app.use("/api/products", upload.array("images", 5), productRoute);

app.use("/api/orders", orderRoute);

app.use("/api/users", auth, upload.single("image"), userRoute);

app.use("/api/auth", authRoute);

app.get("/", (req, res) => {
  res.json({
    name: config.name,
    port: config.port,
    version: config.version,
    status: "OK",
  });
});

app.listen(5000, () => {
  console.log("Server is running......");
});

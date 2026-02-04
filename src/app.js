import bodyParser from "body-parser";
import express from "express";
import connectDB from "./config/database.js";
import productRoute from "./routes/product.route.js";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import config from "./config/config.js";
import logger from "./middleware/logger.js";
import auth from "./middleware/auth.js";

const app = express();

connectDB();

app.use(bodyParser.json())

app.use(logger)

app.use("/api/products", productRoute);

app.use("/api/users", userRoute);

app.use("/api/auth", authRoute);

app.get("/", (req, res) => {
    res.json({
        name: config.name,
        port: config.port,
        version: config.version,
        status: "OK"
    })
})






app.listen(5000, () => {
    console.log("Server is running......");
});
























































// import express from "express";
// import fs from 'fs';
// import config from "./config/config.js";
// import productRoute from "./routes/product.route.js"




// const app = express();
// app.listen(config.port, () => {
//     console.log(`Server is running at ${config.port}`)
// })


// // routes
// app.get("/home", getUserController)

// // controller
// function getUserController(req, res) {
//     const userData = getUserServices()
//     res.json(userData)
// }

// // services
// function getUserServices() {
//     const response = fs.readFileSync("data/data.json", "utf8")
//     const data = JSON.parse(response);
//     return data.map((item) => ({ name: item.name, email: item.email, usernaem: item.username }))

// }

// app.use("/", productRoute)

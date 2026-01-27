import dotenv from "dotenv"

dotenv.config()

const config = {
    name: process.env.NAME || "",
    port: process.env.PORT || "",
    version: process.env.VERSION || "",
    mongodbUrl: process.env.MONGODB_URL || ""
}


export default config  
import dotenv from "dotenv";

dotenv.config();

const config = {
  appUrl: process.env.APP_URL || "",
  name: process.env.NAME || "",
  port: process.env.PORT || "",
  version: process.env.VERSION || "",
  mongodbUrl: process.env.MONGODB_URL || "",
  jwtSecret: process.env.JWT_SECRET || "",
  jwtExpire: process.env.JWT_EXPIRE || "1d",

  khalti: {
    apiUrl: process.env.KHALTI_API_URL || "",
    secretKey: process.env.KHALTI_SECRET_KEY || "",
  },

  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || "",
    apiKey: process.env.CLOUDINARY_API_KEY || "",
    apiSecret: process.env.CLOUDINARY_API_SECRET || "",
  },
};

export default config;

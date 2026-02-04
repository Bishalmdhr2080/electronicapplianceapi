import config from "../config/config.js"
import jwt from "jsonwebtoken"


const createJWT = (user) => {

    const token = jwt.sign(user, config.jwtSecret, { expiresIn: config.jwtExpire });

    return token
}

const verifyJWT = async (token) => {
    return await new Promise((resolve, reject) => {

        jwt.verify(token, config.jwtSecret, (error, data) => {

            if (error) throw reject(error);

            resolve(data)
        })
    })

}


export { createJWT, verifyJWT }
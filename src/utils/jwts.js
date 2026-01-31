import jwt from "jsonwebtoken"

const createJWT = (user) => {

    const token = jwt.sign(JSON.stringify(user), "secretkey");

    return token
}

export default createJWT    
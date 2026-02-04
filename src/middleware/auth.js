import { verifyJWT } from "../utils/jwts.js";

const auth = async (req, res, next) => {
    const cookie = await req.headers.cookie

    if (!cookie) return res.status(401).send("usernot autheniticated no cookie")

    const token = cookie.split("=")[1];

    if (!token) return res.status(401).send("user authenticated error no token")

    try {
        const data = await verifyJWT(token)

        req.user = data;

        next()

    } catch (error) {
        res.status(401).send("invalid token")
    }
}

export default auth
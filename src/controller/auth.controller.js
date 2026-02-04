import authService from "../services/auth.service.js"
import { createJWT } from "../utils/jwts.js";


const login = async (req, res) => {
    try {
        const data = await authService.login(req.body)

        const token = createJWT(data)

        res.cookie("authToken", token, { maxAge: 86400 * 1000 })

        console.log(token)

        res.json(data)

    } catch (err) {
        res.status(err.status || 500).send(err.message)
    }
}

const register = async (req, res) => {

    const data = req.body;

    const token = createJWT(data)

    res.cookie("authToken", token, { maxAge: 86400 * 1000 })

    console.log(token)


    try {
        const registeredUser = await authService.register(data)
        res.json(registeredUser)
    } catch (error) {
        res.status(error.status || 500).send(error.message)
    }
}

export default { login, register }
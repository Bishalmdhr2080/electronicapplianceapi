import authService from "../services/auth.service.js"




const login = (req, res) => {
    authService.login()
    res.send("login sucessful")

}

const register = async (req, res) => {
    const data = req.body;

    try {
        const registeredUser = await authService.register(data)
        res.json(registeredUser)
    } catch (err) {
        res.status(err.status || 500).send(err.message)

    }
}

export default { login, register }
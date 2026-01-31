import authService from "../services/auth.service.js"




const login = async (req, res) => {
    const data = req.body;
    try {
        const user = await authService.login(data)
        res.json(user)
    } catch (err) {
        res.status(err.status || 500).send(err.message)

    }


}

const register = async (req, res) => {
    const data = req.body;

    try {
        const registeredUser = await authService.register(data)
        res.json(registeredUser)
    } catch (error) {
        res.status(error.status || 500).send(error.message)

    }
}

export default { login, register }
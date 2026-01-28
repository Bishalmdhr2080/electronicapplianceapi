
import userService from "../services/user.service.js"


const createUser = async (req, res) => {
    const data = req.body;
    try {

        const createdUser = await userService.createUser(data);

        res.status(201).send(createdUser)
    } catch (error) {
        res.status(error.status || 500).send(error?.message)
    }
}

export default { createUser };
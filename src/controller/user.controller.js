
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

const getUser = async (req, res) => {
    try {
        const getUser = await userService.getUser();

        res.status(201).send(getUser)
    } catch (error) {
        res.status(error.status || 500).send(error?.message)
    }
}

const getUserById = async (req, res) => {
    const id = req.params.id

    try {
        const data = await userService.getUserById(id);

        res.json(data)
    } catch (error) {
        res.status(error.status || 500).send(error?.message)
    }
}

const updateUserById = async (req, res) => {
    const id = req.params.id;
    const data = req.body
    try {
        const updatedUser = await userService.updateUserById(id, data);

        res.status(201).json({
            message: "User updated ",
            data: updatedUser
        })
    } catch (error) {
        res.status(error.status || 404).send(error?.message)

    }
}


const deletUserById = async (req, res) => {
    const id = req.params.id;
    try {
        await userService.deletUserById(id);

        res.json({ message: "User deleted ", id })
    } catch (error) {
        res.status(error.status || 404).send(error?.message)

    }


}


export default { createUser, getUser, getUserById, updateUserById, deletUserById };
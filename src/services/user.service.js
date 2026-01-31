
import User from "../models/User.js"

const createUser = async (data) => {
    if (!data) throw {
        message: "User not found",
        status: 401,
    }
    return await User.create(data)
}


const getUser = async () => {
    const user = await User.find()

    if (!user) throw {
        status: 404,
        message: "product not found"
    }
    return user
}




export default { createUser, getUser };
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

        message: "USER not found"
    }

    return user
}

const getUserById = async (id) => {
    const user = await User.findById(id);
    if (!user) throw {
        message: "product not found",

        status: 404
    }
    return user
}

const deletUserById = async (id) => {
    await getUserById(id)
    await User.findByIdAndDelete(id)
}

const updateUserById = async (id, data) => {
    await getUserById(id)
    return await User.findByIdAndUpdate(id, data, { new: true })
}


export default { createUser, getUser, getUserById, updateUserById, deletUserById };
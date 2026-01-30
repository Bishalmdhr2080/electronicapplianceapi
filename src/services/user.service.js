
import User from "../models/User.js"

const createUser = async (data) => {
    console.log(data);
    if (!data) throw {
        message: "User not found",
        status: 401,
    }
    return await User.create(data)
}




export default { createUser };
import User from "../models/User.js"
import bcrypt from "bcryptjs"

const register = async (data) => {
    const user = await User.findOne({ email: data.email })
    if (user) {
        throw {
            message: "User email already exist",
            status: 409
        }
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);
    return await User.create({
        name: data.name,
        email: data.email,
        password: hashedPassword,
        phone: data.phone,
        address: data.address,


    })



}

const login = () => {
    console.log("login")
}

export default { register, login }
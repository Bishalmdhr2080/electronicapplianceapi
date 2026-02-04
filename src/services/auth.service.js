import User from "../models/User.js";
import bcrypt from "bcryptjs";

const register = async (data) => {
    const user = await User.findOne({ $or: [{ email: data?.email }, { phone: data?.phone }] });

    if (user) throw {
        status: 409,
        message: "Username already exists"
    }

    const salt = await bcrypt.genSalt(10);
    if (!data.password) throw {
        message: "password is required"
    }

    const hashedPassword = await bcrypt.hash(data.password, salt);

    const createdUser = await User.create({
        name: data.name,
        email: data.email,
        password: hashedPassword,
        phone: data.phone,
        address: data.address,
    });

    return {
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        phone: createdUser.phone,
        address: createdUser.address,
        roles: createdUser.roles,
        isActive: createdUser.isActive,
    }
};

const login = async (data) => {
    const user = await User.findOne({ $or: [{ email: data?.email }, { phone: data?.phone }] });
    console.log(user);
    if (!user) {
        const err = new Error("Invalid email or password");
        err.status = 401;
        throw err;
    }

    const isPasswordCorrect = await bcrypt.compare(data.password, user.password);

    if (!isPasswordCorrect) {
        const err = new Error("email or password not match");
        err.status = 401;
        throw err;
    }

    return {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        roles: user.roles,
        isActive: user.isActive,
    };
};

export default { register, login };

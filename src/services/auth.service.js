import User from "../models/User.js";
import bcrypt from "bcryptjs";
import createJWT from "../utils/jwts.js";

const register = async (data) => {
    const user = await User.findOne({ email: data.email });

    if (user) throw {
        status: 409,
        message: "Username already exists"
    }

    const salt = await bcrypt.genSalt(10);
    if (!data.password) throw {
        message: "password is required"
    }

    const hashedPassword = await bcrypt.hash(data.password, salt);

    return await User.create({
        name: data.name,
        email: data.email,
        password: hashedPassword,
        phone: data.phone,
        address: data.address,
    });
};

const login = async (data) => {
    const user = await User.findOne({ $or: [{ email: data?.email }, { phone: data?.phone }] });

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
    const token = createJWT(user);

    console.log(token)


    return user;
};

export default { register, login };

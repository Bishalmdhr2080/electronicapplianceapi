import User from "../models/User.js";
import bcrypt from "bcryptjs";
import ResetPassword from "../models/ResetPassword.js";
import config from "../config/config.js";
import sendEmail from "../utils/email.js";

const register = async (data) => {
  const user = await User.findOne({
    $or: [{ email: data?.email }, { phone: data?.phone }],
  });

  if (user)
    throw {
      status: 409,
      message: "Username already exists",
    };

  const salt = await bcrypt.genSalt(10);
  if (!data.password)
    throw {
      message: "password is required",
    };

  const hashedPassword = await bcrypt.hash(data.password, salt);

  const createdUser = await User.create({
    name: data.name,
    email: data.email,
    phone: data.phone,
    address: data.address,
    password: hashedPassword,
  });

  return {
    _id: createdUser._id,
    name: createdUser.name,
    email: createdUser.email,
    phone: createdUser.phone,
    address: createdUser.address,
    roles: createdUser.roles,
    isActive: createdUser.isActive,
  };
};

const login = async (data) => {
  const user = await User.findOne({
    $or: [{ email: data?.email }, { phone: data?.phone }],
  });
  console.log(user);
  if (!user) {
    const err = new Error("Invalid email or password");
    err.status = 401;
    throw err;
  }
  if (!user.isActive)
    throw {
      status: 400,
      message: "User is deactive",
    };

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
//forgetPassword//

const forgetPassword = async (email) => {
  const user = await User.findOne({ email });

  if (!user) throw { status: 404, message: "Error Credentials" };

  const token = crypto.randomUUID();

  await ResetPassword.create({
    userId: user._id,
    token,
  });

  const resetPasswordLink = `${config.appUrl}/reset-password?userId=${user._id}&token=${token}`;

  sendEmail(email, {
    subject: "Reset password link",
    html: `
      <div style="padding: 16px; font-family: sans-serif">
        <h1>Please click the link to reset your password.</h1>
        <a
          href="${resetPasswordLink}"
          style="
            background-color: dodgerblue;
            color: white;
            text-decoration: none;
            padding: 10px 32px;
            border-radius: 8px;
          "
        >
          Reset password
        </a>
      </div>
    `,
  });

  return { message: "reset password link send sucessfull" };
};

//resetPassword//

const resetPassword = async (userId, token, password) => {
  const data = await ResetPassword.findOne({
    userId,
    expiresAt: { $gt: Date.now() },
    isUsed: "false",
  }).sort({ createdAt: -1 });

  if (!data || data.token !== token) {
    throw { status: 400, message: "Invalid or Expire Token" };
  }

  if (data.isUsed) {
    throw {
      status: 400,
      message: "link is Already Used",
    };
  }

  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(password, salt);

  await User.findByIdAndUpdate(userId, { password: hashedPassword });

  await ResetPassword.findByIdAndUpdate(data._id, { isUsed: true });

  return { message: "Password Reset Successful" };
};

export default {
  register,
  login,
  forgetPassword,
  forgetPassword,
  resetPassword,
};

import User from "../models/User.js";
import uploadFile from "../utils/fileUploader.js";

const createUser = async (data) => {
  if (!data)
    throw {
      message: "User not found",

      status: 401,
    };
  return await User.create(data);
};

const getUsers = async (query) => {
  const { name, limit, offset } = query;

  const sort = query.sort ? JSON.parse(query.sort) : {};

  const filters = {};

  if (name) filters.name = { $regex: name, $options: "i" };

  return await User.find(filters).sort(sort).limit(limit).skip(offset);
};

const getUserById = async (id) => {
  const user = await User.findById(id);
  if (!user)
    throw {
      message: "product not found",

      status: 404,
    };
  return user;
};

const deletUserById = async (id) => {
  await getUserById(id);
  await User.findByIdAndDelete(id);
};

const updateUserById = async (id, data) => {
  await getUserById(id);
  return await User.findByIdAndUpdate(id, data, { new: true });
};

const updateProfileImage = async (id, file) => {
  const uploadedFile = await uploadFile([file]);

  return await User.findByIdAndUpdate(
    id,
    {
      profileImageUrl: uploadedFile[0].url,
    },
    { new: true },
  );
};

export default {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  deletUserById,
  updateProfileImage,
};

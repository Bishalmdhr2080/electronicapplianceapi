import userService from "../services/user.service.js";

const createUser = async (req, res) => {
  const data = req.body;
  try {
    const createdUser = await userService.createUser(data);

    res.status(201).send(createdUser);
  } catch (error) {
    res.status(error.status || 500).send(error?.message);
  }
};

const getUsers = async (req, res) => {
  const query = req.query;
  try {
    const getUsers = await userService.getUsers(query);

    res.status(201).send(getUsers);
  } catch (error) {
    res.status(error.status || 500).send(error?.message);
  }
};

const getUserById = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await userService.getUserById(id);

    res.json(data);
  } catch (error) {
    res.status(error.status || 500).send(error?.message);
  }
};

const getLoggedInUser = async (req, res) => {
  const id = req.user._id;
  console.log(id);

  try {
    const data = await userService.getLoggedInUser(id);

    res.json(data);
  } catch (error) {
    res.status(error.status || 500).send(error?.message);
  }
};

const updateUserById = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const authUser = req.user; //req.user is fetch from auth
  try {
    const updatedUser = await userService.updateUserById(id, data, authUser);

    res.status(201).json({
      message: "User updated ",
      data: updatedUser,
    });
  } catch (error) {
    res.status(error.status || 404).send(error?.message);
  }
};

const deletUserById = async (req, res) => {
  const id = req.params.id;
  try {
    await userService.deletUserById(id);

    res.json({ message: "User deleted ", id });
  } catch (error) {
    res.status(error.status || 404).send(error?.message);
  }
};

const updateProfileImage = async (req, res) => {
  try {
    const data = await userService.updateProfileImage(req.user._id, req.file);

    res.status(201).send(data);
  } catch (error) {
    res.status(error.status || 500).send(error?.message);
  }
};

const updateUserRoles = async (req, res) => {
  try {
    const data = await userService.updateUserRoles(
      req.params.id,
      req.body.roles,
    );
    res.status(201).send(data);
  } catch (error) {
    res.status(error.status || 500).send(error?.error);
  }
};

export default {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  deletUserById,
  updateProfileImage,
  getLoggedInUser,
  updateUserRoles,
};

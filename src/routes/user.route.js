import express from "express";
import userController from "../controller/user.controller.js";
import validate from "../middleware/validator.js";
import { userSchema } from "../lib/schemas/user.js";
import roleBaseAuth from "../middleware/roleBasedAuth.js";
import { ROLE_ADMIN } from "../constants/roles.js";

const router = express.Router();

router.post("/", validate(userSchema), userController.createUser);

router.get("/", roleBaseAuth(ROLE_ADMIN), userController.getUsers);

router.get("/:id", userController.getUserById);

router.put("/:id", userController.updateUserById);

router.delete("/:id", roleBaseAuth(ROLE_ADMIN), userController.deletUserById);

router.patch("/profile-image", userController.updateProfileImage);

export default router;

import express from "express"
import userController from '../controller/user.controller.js'

const router = express.Router()

router.post('/', userController.createUser)

router.get('/', userController.getUser)

router.get('/:id', userController.getUserById)

router.put('/:id', userController.updateUserById)

router.delete('/:id', userController.deletUserById)







export default router;
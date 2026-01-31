import express from "express"
import userController from '../controller/user.controller.js'

const router = express.Router()

router.post('/', userController.createUser)

router.get('/user', userController.getUser)




export default router;
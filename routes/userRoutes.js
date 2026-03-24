import express from "express"
import { SignIn, Signup } from "../controllers/userController.js"
const userRouter= express.Router()

userRouter.post('/',Signup)
userRouter.post('/signIn',SignIn)

export default userRouter 
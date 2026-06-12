import express from "express"
import { cancelRide, forgotPassword, getDetails, Myride, SignIn, Signup } from "../controllers/userController.js"
const userRouter = express.Router()

userRouter.post('/', Signup)
userRouter.post('/signIn', SignIn)
userRouter.get('/getMyride/:id', Myride)
userRouter.delete('/cancel/:id', cancelRide)
userRouter.get('/getDetails', getDetails)
userRouter.patch('/forgotpassword',forgotPassword)
export default userRouter 
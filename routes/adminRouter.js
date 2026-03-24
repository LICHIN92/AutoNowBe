import express from 'express'
import { addStand } from '../controllers/adminController.js'
const adminRouter = express.Router()

adminRouter.post('/',addStand)

export default adminRouter
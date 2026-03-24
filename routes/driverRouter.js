import express from 'express'
import { register } from '../controllers/driverControllers.js'

const driverRouter = express.Router()

driverRouter.post('/',register)

export default driverRouter
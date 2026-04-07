import express from 'express'
import { addStand, getDriverNumber, stationNumber, usersNumber, verfiedDriver} from '../controllers/adminController.js'
const adminRouter = express.Router()

adminRouter.post('/',addStand)

adminRouter.get('/getNumDriver',getDriverNumber)

adminRouter.get('/getUsers',usersNumber)

adminRouter.get('/getStation',stationNumber)

adminRouter.get('/verfiedDriver',verfiedDriver)
export default adminRouter


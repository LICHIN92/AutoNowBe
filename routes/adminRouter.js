import express from 'express'
import {
    addStand, eachSattion, getDriverNumber, NoofBookingToday, stationNumber,
    todaystation, usersNumber, verfiedDriver
} from '../controllers/adminController.js'
const adminRouter = express.Router()

adminRouter.post('/', addStand)

adminRouter.get('/getNumDriver', getDriverNumber)

adminRouter.get('/getUsers', usersNumber)

adminRouter.get('/getStation', stationNumber)

adminRouter.get('/verfiedDriver', verfiedDriver)

adminRouter.get('/eachstation', eachSattion)
 
adminRouter.get('/todaystation', todaystation)
 
adminRouter.get('/noofBookingToday', NoofBookingToday)
export default adminRouter
 

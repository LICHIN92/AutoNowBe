import express from 'express'
import {
    addStand, deteleDriver, DriverAtEachStation, DriverInStattion, eachSattion, getDriverNumber, NoofBookingToday, pendingAtStation, stationNumber,
    stations,
    todaystation, usersNumber, verfiedDriver,
    verifiedDriversAtStand
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

adminRouter.get('/stationsDriver', DriverInStattion)

adminRouter.get('/pending', pendingAtStation)

adminRouter.get('/verifiedDrivers',verifiedDriversAtStand)

adminRouter.get('/stations',stations)

adminRouter.get('/DriverAtStation',DriverAtEachStation)

adminRouter.delete('/deleteDriver',deteleDriver)
export default adminRouter

 
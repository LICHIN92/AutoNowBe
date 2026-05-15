import express from 'express'
import {
    addStand, blockUser, deleteNonVerified, DeleteStand, deteleDriver, DriverAtEachStation,
    DriverInStattion, driverRevenue, eachSattion, editDriverData, getBlockeduser, getDriverNumber,
    getuser,
    NoofBookingToday, NoOfpendingDrivers, pendingAtStation,
    pendingDriverslist, revenueBySatnd, RevenueToday, stationNumber,
    stations, todaystation, usersNumber, verfiedDriver,
    verifiedDriversAtStand, verifyingDriver
} from '../controllers/adminController.js'
import { AdminAuth } from '../middleware/adminAuth.js'

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

adminRouter.get('/verifiedDrivers', verifiedDriversAtStand)

adminRouter.get('/stations', stations)

adminRouter.get('/DriverAtStation', DriverAtEachStation)

adminRouter.delete('/deleteDriver', deteleDriver)

adminRouter.get('/revenueToday', RevenueToday)

adminRouter.get('/revenueBySatnd', revenueBySatnd)

adminRouter.get('/driverRevenue', driverRevenue)

adminRouter.delete('/DeleteStand', DeleteStand)

adminRouter.get('/pendingDrivers', NoOfpendingDrivers)

adminRouter.get('/pendingDriverslist', pendingDriverslist)

adminRouter.delete('/deleteNonVerified/:id', AdminAuth, deleteNonVerified)

adminRouter.patch('/verifyingDriver', AdminAuth, verifyingDriver)

adminRouter.patch('/editDriverData/:id',AdminAuth,editDriverData)

adminRouter.post('/getuser',AdminAuth,getuser)

adminRouter.patch('/blockUser/:id',AdminAuth,blockUser)

adminRouter.get('/getBlockeduser',getBlockeduser)

export default adminRouter  

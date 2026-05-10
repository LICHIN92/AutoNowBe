import express from 'express'
import {
    AddProfile, finishRide, getbook, getDetails, login, myRide,
    readyTodrive, register, toadysMyRide, todayBookings, tommarrowsRide
} from '../controllers/driverControllers.js'
import { driverAuth } from '../middleware/driverAuth.js'
import upload from '../middleware/upload.js'

const driverRouter = express.Router()

driverRouter.post('/', register)

driverRouter.post('/login', login)

driverRouter.get('/toadysMyRide', driverAuth, toadysMyRide)

driverRouter.patch('/addprofile/:id', upload.single("image"), AddProfile)

driverRouter.get('/getbook', driverAuth, getbook)

driverRouter.get('/getDetail', getDetails)

driverRouter.patch('/readyDrive', driverAuth, readyTodrive)

driverRouter.get('/myride', driverAuth, myRide)

driverRouter.patch('/finishRide/:id', driverAuth, finishRide)

driverRouter.get('/todayBookings', driverAuth, todayBookings)

driverRouter.get('/tommarrow', driverAuth, tommarrowsRide)

export default driverRouter     
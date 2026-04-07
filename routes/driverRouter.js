import express from 'express'
import { AddProfile, login, NofBookOnMyOwnStation, register } from '../controllers/driverControllers.js'
import { driverAuth } from '../middleware/driverAuth.js'
import upload from '../middleware/upload.js'

const driverRouter = express.Router()

driverRouter.post('/', register)
driverRouter.post('/login', login)
driverRouter.get('/NoOfBook', NofBookOnMyOwnStation)
driverRouter.patch('/addprofile',driverAuth,upload.single("image"), AddProfile)
export default driverRouter
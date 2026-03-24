import  express from 'express'
import { booking, getStand } from '../controllers/riderController.js'

const RideRouter=express.Router()

RideRouter.post('/',booking)
RideRouter.get('/getStand',getStand)
export default RideRouter    
import express from 'express'
import 'dotenv/config';
import connectDb from './config/db.js';
import userRouter from './routes/userRoutes.js';
import cors from 'cors'
import driverRouter from './routes/driverRouter.js';
import RideRouter from './routes/rideRouter.js';
import adminRouter from './routes/adminRouter.js';
const app = express()
connectDb()

const allowedOrigin = ['https://heyautonow.vercel.app', 'http://localhost:5173']
app.use(cors({
    origin: allowedOrigin,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
// app.use(cors(0))
app.use(express.json())

app.use('/user', userRouter)
app.use('/driver', driverRouter)
app.use('/ride', RideRouter)
app.use('/admin', adminRouter)
app.listen(process.env.port, () => {
    console.log(`app is running at ${process.env.port}`);

})      
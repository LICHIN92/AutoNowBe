import Ride from "../models/Ride.js"
import Stand from "../models/stand.js";

const booking = async (req, res) => {
    console.log(req.body);

    const { pickup, drop, date, time, userId } = req.body
    try {
        const data = await new Ride({
            pickup: pickup, drop: drop, userId: userId, time: time, date: date
        }).save()
        console.log(data)
        return res.status(200).json(`Thank you for choosing AutoNow! Have a safe journey!`)

    } catch (error) {
        console.log(error);

        return res.status(500).json(`internal server error`)
    }
}

const getStand=async(req,res)=>{
    try {
        const data=await Stand.find()
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json(`internal server error`)
        
    }
}
export { booking ,getStand}
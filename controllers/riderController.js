import Ride from "../models/Ride.js"
import Stand from "../models/stand.js";
import User from "../models/User.js";

const booking = async (req, res) => {
    console.log(req.body);

    const { pickup, drop, date, time, userId, nearStand } = req.body
    try {
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json("User not found");
        }
        if (user.fake) {
            console.log(user)

            return res.status(403).json(
                "Sorry, your account is restricted from booking rides."
            );

        }
        const equalToTwo = await Ride.find({ userId: userId, Status: "pending", date: date })
        console.log(equalToTwo)
        console.log(equalToTwo.length)

        if (equalToTwo.length == 2) {
            return res.status(400).json(
                `You can't book more than 2 rides on ${date} until one is accepted.`
            );
        }

        const data = await new Ride({
            pickup: pickup, drop: drop, userId: userId, time: time, date: date, NearestStation: nearStand
        }).save()
        console.log(data)
        return res.status(200).json(`Thank you for choosing AutoNow! Have a safe journey!`)

    } catch (error) {
        console.log(error);

        return res.status(500).json(`internal server error`)
    }
}

const getStand = async (req, res) => {
    try {
        const data = await Stand.find()
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json(`internal server error`)

    }
}
export { booking, getStand }
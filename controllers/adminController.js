import Driver from "../models/Driver.js";
import Ride from "../models/Ride.js";
import Stand from "../models/stand.js"
import User from "../models/User.js";

const addStand = async (req, res) => {
    const { standName } = req.body
    try {
        const isexist = await Stand.findOne({ StandName: standName })
        if (isexist) {
            console.log(isexist);

            return res.status(400).json(`alreadty exist`)
        }
        const data = await new Stand({
            StandName: standName
        }).save()
        console.log(data);
        return res.status(200).json(`added succesfuly`)
    } catch (error) {
        return res.status(500).json(`internel server error`)

    }
}

const getDriverNumber = async (req, res) => {
    console.log('getDriverNumber')
    try {
        const data = await (await Driver.find()).length
        console.log(data);
        return res.status(200).json(data)

    } catch (error) {
        console.log(error);
        return res.status(500).json('internal server error')
    }
}

const usersNumber = async (req, res) => {
    console.log('user')
    try {
        const data = await User.countDocuments();
        console.log(data);
        return res.status(200).json(data)


    } catch (error) {
        return res.status(500).json(`internal server errror`)
    }
}

const stationNumber = async (req, res) => {
    console.log('station Number');
    try {
        const data = await Stand.countDocuments();
        console.log(data);

        return res.status(200).json(data)

    } catch (error) {
        console.log(error);
        return res.status(500).json(`internal server error`)
    }

}

const verfiedDriver = async (req, res) => {
    try {
        const data = await Driver.find({ isVerified: true })
        console.log(data);
        return res.status(200).json(data)
    } catch (error) {
        console.log(error);
        return res.status(500).json(`internal server error`)
    }
}

const eachSattion = async (req, res) => {
    console.log('/eachstation')
    const d = new Date().toISOString().split("T")[0];
    console.log(d); // 2026-04-27

    const [year, month, date] = d.split("-");

    // use variables directly
    console.log(date + "/" + month + "/" + year);

    // or template literal
    console.log(`${date}/${month}/${year}`);
    const today = date + "/" + month + "/" + year
    console.log(today)
    try {
        const data = await Ride.aggregate([
            {
                $match: {
                    date: today
                }
            },
            {
                $group: {
                    _id: "$NearestStation",
                    totalBookings: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    station: "$_id",
                    totalBookings: 1
                }
            }, {
                $sort: {
                    totalBookings: -1
                }
            }
        ])

        console.log(data)
        return res.status(200).json(data)

    } catch (error) {
        console.log(error)
    }
}

const todaystation = async (req, res) => {
    console.log('todaystation')
    const d = new Date().toISOString().split("T")[0];
    console.log(d); // 2026-04-27

    const [year, month, date] = d.split("-");

    // use variables directly
    // console.log(date + "/" + month + "/" + year);

    // or template literal
    // console.log(`${date}/${month}/${year}`);
    const today = date + "/" + month + "/" + year
    console.log(today)
    console.log(req.query.station)
    try {
        const data = await Ride.aggregate([
            {
                $match: {
                    date: today,
                    NearestStation: req.query.station
                }
            },
            {
                $group: {
                    _id: "$Status",
                    total: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    Status: "$_id",
                    total: 1
                }
            }
        ]);
        console.log(data)
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json(`internal server error`)

    }
}
const NoofBookingToday = async (req, res) => {
    console.log('No of Bookings Today')
    const d = new Date().toISOString().split("T")[0];
    console.log(d); // 2026-04-27

    const [year, month, date] = d.split("-");

    // use variables directly
    // console.log(date + "/" + month + "/" + year);

    // or template literal
    // console.log(`${date}/${month}/${year}`);
    const today = date + "/" + month + "/" + year
    console.log(today)

    try {
        const data = (await Ride.find({ date: today })).length
        console.log(data)
        return res.status(200).json(data

        )
    } catch (error) {
        console.log(error)
        return res.status(500).json(`internal server error`)
    }
}
export {
    addStand, getDriverNumber, usersNumber, stationNumber,
    verfiedDriver, eachSattion, todaystation, NoofBookingToday
}



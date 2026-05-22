import cloudinaryInstance from "../config/Cloudinary.js";
import Driver from "../models/Driver.js";
import Ride from "../models/Ride.js";
import Stand from "../models/stand.js"
import User from "../models/User.js";
import Visiters from "../models/visiter.js";

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
        const data = await (await Driver.find({ isVerified: true })).length
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

const DriverInStattion = async (req, res) => {
    console.log('stationsDriver')
    console.log(req.query.station)
    const stand = req.query.station
    try {
        const data = await Driver.find({ stand: stand, isVerified: true })
        console.log(data)
        return res.status(200).json(data)
    } catch (error) {
        console.log(error)
        return res.status(500).json(`internal server error`)
    }
}

const pendingAtStation = async (req, res) => {
    console.log(req.query.station)
    const stand = req.query.station
    const d = new Date().toISOString().split("T")[0];
    // console.log(d); // 2026-04-27

    const [year, month, date] = d.split("-");
    const today = date + "/" + month + "/" + year
    console.log(today)
    try {
        const data = await Ride.find({ NearestStation: stand, date: today, Status: "pending" })
        console.log(data)
        return res.status(200).json(data)
    } catch (error) {
        console.log(error)
        return res.status(500).json(`internal server error`)
    }
}

const verifiedDriversAtStand = async (req, res) => {
    console.log(req.query.station)
    const stand = req.query.station
    try {
        const data = await Driver.find({ stand: stand, isVerified: true })
        console.log(data)
        return res.status(200).json(data)

    } catch (error) {
        console.log(error)
        return res.status(500).json(`internal server error`)
    }
}

const stations = async (req, res) => {
    console.log('stations')
    try {
        const data = await Stand.find()
        console.log(data)
        return res.status(200).json(data)
    } catch (error) {
        console.log(error)
        return res.status(500).json(`internal server error`)
    }
}

const DriverAtEachStation = async (req, res) => {
    console.log('DriverAtEachStation')
    try {
        const data = await Driver.aggregate([
            {
                $match: {
                    isVerified: true
                }
            },
            {
                $group: {
                    _id: "$stand",
                    total: { $sum: 1 },
                    drivers: {
                        $push: {
                            Name: "$Name",
                            vehicleNumber: "$vehicleNumber",
                            profileImage: "$profileImage",
                            mobile: "$Mobile",
                            type: "$vehicleType"
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    stand: "$_id",
                    total: 1,
                    drivers: 1
                }
            }
        ])
        console.log(data)
        return res.status(200).json(data)
    } catch (error) {
        console.log(error)
        return res.status(500).json(`internal server error`)
    }

}

const deteleDriver = async (req, res) => {
    console.log(req.body)
    try {
        const data = await Driver.findOneAndDelete({ vehicleNumber: req.body.id })
        console.log(data)

        if (!data) {
            return res.status(404).json('Driver not found')
        }
        if (data.profileImage) {
            console.log(data.profileImage)
            await cloudinaryInstance.uploader.destroy(data.profileImage);
            console.log('deleted profilepic')
        }
        return res.status(200).json(`${req.body.id} is deleted succesfully`)

    } catch (error) {
        console.log(error)
        return res.status(500).json(`internal server error`)
    }
}

const RevenueToday = async (req, res) => {
    console.log('RevenueToday')
    const datee = new Date().toLocaleDateString('en-GB');
    console.log(datee);
    try {
        const data = await Ride.find({ Status: "completed", date: datee })
        console.log(" RevenueToday", data)
        const revenue = data.length * 15;
        console.log(revenue)
        return res.status(200).json(revenue)
    } catch (error) {
        console.log(error)
        return res.status(500).json(`internal server error`)
    }
}

const revenueBySatnd = async (req, res) => {
    console.log('revenueBySatnd')
    const datee = new Date().toLocaleDateString('en-GB');
    console.log(datee);
    try {
        const data = await Ride.aggregate([
            {
                $match: {
                    date: datee,
                    Status: { $ne: 'pending' }
                }
            },
            {
                $group: {
                    _id: "$NearestStation",
                    total: { $sum: 1 }
                }
            }
        ])
        console.log(data)
        return res.status(200).json(data)
    } catch (error) {
        console.log(error)
        return res.status(500).json(`internal server error`)
    }
}

const driverRevenue = async (req, res) => {
    console.log('driverRevenue')
    console.log(req.query)
    const stand = req.query.stand
    const datee = new Date().toLocaleDateString('en-GB');
    console.log(datee);
    try {
        const data = await Ride.aggregate([
            {
                $match: {
                    NearestStation: stand,
                    date: datee,
                    Status: "completed"
                }
            },
            {
                $lookup: {
                    from: "drivers",
                    localField: "driverId",
                    foreignField: "_id",
                    as: "driver"
                }
            },
            {
                $unwind: "$driver"
            },
            {
                $group: {
                    _id: "$driverId",
                    name: { $first: "$driver.Name" },
                    vehicleNumber: { $first: "$driver.vehicleNumber" },
                    totalRides: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    driverId: "$_id",
                    name: 1,
                    vehicleNumber: 1,   // ✅ add this
                    totalRides: 1
                }
            }
        ])
        console.log(data)
        return res.status(200).json(data)
    } catch (error) {
        console.log(error)
        return res.status(500).json(`internal server error`)
    }
}

const DeleteStand = async (req, res) => {
    console.log('DeleteStand')
    console.log(req.query.stand)
    try {
        const data = await Stand.findOneAndDelete({ StandName: req.query.stand })
        console.log('deleted ');

        return res.status(200).json(`${req.query.stand} is deleted Successfully`)
    } catch (error) {
        console.log(error)
        return res.status(500).json('internal server error')
    }
}

const NoOfpendingDrivers = async (req, res) => {
    console.log('pendingDrivers')
    try {
        const data = (await Driver.find({ isVerified: false })).length
        console.log(data)
        return res.status(200).json(data)
    } catch (error) {
        console.log(error)
        return res.status(500).json('internal server error')
    }
}

const pendingDriverslist = async (req, res) => {
    console.log('pendingDriverslist')
    try {
        const data = await Driver.find(
            { isVerified: false }
        ).select('-Password')
        data.Password = undefined
        console.log(data)
        return res.status(200).json(data)
    } catch (error) {
        console.log(error)
        return res.status(500).json('internal server error')
    }
}

const deleteNonVerified = async (req, res) => {
    console.log('deleteNonVerified')
    console.log(req.params)
    const id = req.params.id
    try {
        const data = await Driver.findById(id)
        console.log(data, 'deleted')
        if (!data) {
            return res.status(404).json(`this driver is not found `)
        }
        if (data.profileImage) {
            console.log(data.profileImage)
            await cloudinaryInstance.uploader.destroy(data.profileImage);
            console.log('profileimage is deleted')
        }
        const del = await Driver.findByIdAndDelete(id)
        return res.status(200).json('deleted successfully')
    } catch (error) {
        console.log(error)
        return res.status(500).json('internal server error')
    }
}

const verifyingDriver = async (req, res) => {
    console.log('verifyingDriver')
    console.log(req.body)
    const id = req.body.id
    try {
        const check = await Driver.findById(id)
        if (!check) {
            return res.status(400).json('not found')

        }

        const data = await Driver.findByIdAndUpdate(id, {
            isVerified: true
        }, { new: true })
        console.log(data)
        return res.status(200).json(`Verified successfully`)
    } catch (error) {
        console.log(error)
        return res.status(500).json('internal server error')
    }
}

const editDriverData = async (req, res) => {
    console.log('editDriverData')
    console.log(req.body)
    console.log(req.params)
    const { Name, Mobile, stand, licenseNumber, vehicleNumber, vehicletype } = req.body
    try {
        const exist = await Driver.findById(req.params.id)
        console.log(exist)
        if (!exist) {
            return res.status(404).json(`driver is not found`)
        }
        const data = await Driver.findByIdAndUpdate(req.params.id, {
            Name: Name, Mobile: Mobile, licenseNumber: licenseNumber, vehicleNumber: vehicleNumber,
            stand: stand, vehicleType: vehicletype
        }, { returnDocument: "after" })
        console.log(data)
        return res.status(200).json('updated')
    } catch (error) {
        console.log(error)
        return res.status(500).json('internal server error')
    }
}

const getuser = async (req, res) => {
    console.log('getuser')
    console.log(req.body)
    try {
        const data = await User.findOne({ Mobile: req.body.mobile }).select("-Password")
        console.log(data)
        if (!data) {
            return res.status(404).json(`${req.body.mobile} is not found`)
        }
        return res.status(200).json(data)
    } catch (error) {
        console.log(error)
        return res.status(500).json('internal server error')
    }
}

const blockUser = async (req, res) => {
    console.log('blockUser')
    console.log(req.params.id)
    try {
        const user = await User.findById(req.params.id)
        console.log(user)
        if (user.Role && user.Mobile == '8086200861') {
            console.log("This is the supreme admin, so can't change this user.");
            return res.status(403).json(`can't Change this User`)
        }
        const change = await User.findByIdAndUpdate(req.params.id, { fake: !user.fake },
            { new: true })
        console.log(change)
        const deleteuserRides = await Ride.deleteMany({ userId: req.params.id })
        if (change.fake) {
            return res.status(200).json("User is blocked")

        }
        return res.status(200).json("User is Unblocked")

    } catch (error) {
        console.log(error)
        return res.status(500).json('internal server error')
    }
}

const getBlockeduser = async (req, res) => {
    console.log('getBlockeduser')
    try {
        const data = await User.find({ fake: true }).select("-Password")
        console.log(data)
        console.log(data.length)
        return res.status(200).json(data)
    } catch (error) {
        console.log(error)
        return res.status(500).json('internal server error')
    }
}

const visiters = async (req, res) => {
    console.log('visiters')
    try {
        const today = new Date().toLocaleDateString("en-us", {
            timeZone: "Asia/Kolkata"
        });
        const data = await Visiters.findOne({ date: today })
        return res.status(200).json(data)
        console.log(data)
    } catch (error) {
        console.log(error)
        return res.status(500).json('internal server error')
    }
}

export {
    addStand, getDriverNumber, usersNumber, stationNumber, verifiedDriversAtStand,
    verfiedDriver, eachSattion, todaystation, NoofBookingToday, DriverInStattion,
    pendingAtStation, stations, DriverAtEachStation, deteleDriver, RevenueToday, revenueBySatnd,
    driverRevenue, DeleteStand, NoOfpendingDrivers, pendingDriverslist, deleteNonVerified,
    verifyingDriver, editDriverData, getuser, blockUser, getBlockeduser,visiters
}      
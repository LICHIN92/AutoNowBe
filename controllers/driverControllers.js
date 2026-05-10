import Driver from "../models/Driver.js"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import Ride from "../models/Ride.js"
import sharp from "sharp"
import fs from 'fs'
import cloudinaryInstance from "../config/Cloudinary.js"
import { verfiedDriver } from "./adminController.js"

const register = async (req, res) => {
    const { vehicleNumber, Name, Mobile, password, licenceNumber, vehicleType } = req.body
    console.log(req.body)
    try {
        const VehicleExist = await Driver.findOne({ vehicleNumber: vehicleNumber, Mobile: Mobile })
        console.log(VehicleExist);

        if (VehicleExist) {
            return res.status(400).json(`${vehicleNumber} vehicle already registered `)
        }
        const SaltRound = 12
        const hashedPassword = await bcrypt.hash(password, SaltRound)
        console.log(hashedPassword);

        const data = await new Driver({
            Name: Name, Mobile: Mobile, licenseNumber: licenceNumber, vehicleNumber: vehicleNumber,
            vehicleType: vehicleType, Password: hashedPassword
        }).save()
        console.log(data);
        return res.status(200).json(`${vehicleNumber} vehicle succefully registered `)

    } catch (error) {
        console.log(error)
        return res.status(500).json(`internal server error`)

    }
}

const login = async (req, res) => {
    const { password, vehicleNumber } = req.body
    console.log('login');

    console.log(req.body);
    try {
        const findData = await Driver.findOne({ vehicleNumber: vehicleNumber })
        if (!findData) {
            return res.status(400).json(`${vehicleNumber} is not registered`)
        }
        const ismath = await bcrypt.compare(password, findData.Password)
        if (!ismath) {
            return res.status(400).json(`Invalid Password`);
        }
        const update = await Driver.findByIdAndUpdate(findData._id,
            { Status: "online" }, { returnDocument: "after" })
        console.log('updatyed', update);

        const payload = {
            Name: findData.Name, Mobile: findData.Mobile, stand: findData.stand, pic: findData.profileImage,
            vehicleNumber: findData.vehicleNumber, id: findData._id, Verifed: findData.isVerified,
            Status: update.Status
        }


        const token = jwt.sign(payload, process.env.jwt_secret_key)
        return res.status(200).json({ token: token, message: "Log in successful" })
    } catch (error) {
        console.log(error);
        return res.status(500).json(`internel server error`)
    }
}

const toadysMyRide = async (req, res) => {
    console.log('NofBookOnMyOwnStation');
    console.log(req.id)
    console.log(req.query)
    const datee = new Date().toLocaleDateString('en-GB');
    console.log(datee);
    try {
        const driver = await Driver.findById(req.id)
        console.log(driver.isVerified);
        if (!driver.isVerified) {
            return res.status(400).json('You are not verified \nPlease contact admin');
        }
        const data = (await Ride.find({ driverId: req.id, date: datee })).length
        console.log(data);
        return res.status(200).json(data)
    } catch (error) {
        console.log(error)
        return res.status(500).json(`internal server error`)
    }
}

const AddProfile = async (req, res) => {
    console.log(req.body);
    console.log(req.params);
    console.log('add profile images')
    const { stand } = req.body
    const id = req.params.id
    try {
        if (!req.file) {
            return res.status(400).json("No file uploaded")
        }
        const folderName = "HayAuto";
        const subFolderName = 'Driver';

        const file = await cloudinaryInstance.uploader.upload(req.file.path, {
            public_id: `${folderName}/${req.file.originalname.split('.')[0]}`
        })
        console.log('uploaded to Cloudinary:', file);
        const pic = file.secure_url
        console.log(pic) 
        const data = await Driver.findByIdAndUpdate(id,
            { stand: stand, profileImage: pic }, { returnDocument: "after" }
        )
        console.log('data:-', data);
        const payload = {
            Name: data.Name, Mobile: data.Mobile, stand: data.stand, pic: data.profileImage,
            vehicleNumber: data.vehicleNumber, id: data._id, Verifed: data.isVerified,
            // Status: date.Status
        }
        const token = jwt.sign(payload, process.env.jwt_secret_key)
        return res.status(200).json({ token: token, message: "Uploded successfully" })

        // return res.status(200).json('Profile Picture and Stand are updated successfully')
    } catch (error) {
        console.log(error)
        res.status(500).json("Error compressing image")
    }
}

const getbook = async (req, res) => {
    console.log(req.query);
    console.log('getbook')
    const station = req.query.stand
    try {
        const data = await Ride.find({ NearestStation: station, Status: 'pending' })
        console.log(data);
        if (!data) {
            console.log('no data');

            return res.status(400).json(`No Ride Booking at ${station}`)
        }
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json(`internal server error`)

    }
}

const getDetails = async (req, res) => {
    console.log(req.query.id);
    console.log('getDetails')
    try {
        const data = await Ride.findById(req.query.id).populate({
            path: 'userId', select: [
                'Name', 'Mobile'
            ]
        })
        console.log(data)
        return res.status(200).json(data)
    } catch (error) {
        console.log(error);
        return res.status(500).json(`internal server error`)
    }
}

const readyTodrive = async (req, res) => {
    console.log(req.query.id)
    console.log('ready to drive')
    console.log(req.id)
    try {
        const driver = await Driver.findById(req.id)
        console.log(driver)
        if (driver.Status === "onRide") {
            console.log('pleaSE COMPLETE');

            return res.status(400).json(`please complete Accepted Ride`)

        }

        const update = await Driver.findByIdAndUpdate(
            req.id,
            { Status: "onRide" },
            { returnDocument: "after" }
        )
        const data = await Ride.findByIdAndUpdate(req.query.id, {
            Status: "accepted", driverId: driver._id
        }, { returnDocument: "after" })

        console.log(data)
        return res.status(200).json(data)
    } catch (error) {
        console.log(error)
        return res.status(500).json(`internal server error`)
    }
}

const myRide = async (req, res) => {
    console.log('my ride')
    console.log(req.id);

    try {
        const ride = await Ride.find({ driverId: req.id, Status: "accepted" }).populate({
            path: 'userId', select: [
                'Name', 'Mobile'
            ]
        })
        console.log(ride)
        console.log('my ride')
        return res.status(200).json(ride)
    } catch (error) {
        console.log(error)
        return res.status(500).json(`internal server error`)
    }
}

const finishRide = async (req, res) => {
    console.log('finish')
    console.log(req.params.id)
    const id = req.params.id
    console.log(req.id)
    try {
        const data = await Ride.findByIdAndUpdate(id, { Status: "completed" },
            { returnDocument: "after" })
        console.log(data)
        if (!data) {
            return res.status(400).json('Ride in not fond ')

        }
        const update = await Driver.findByIdAndUpdate(req.id, {
            Status: "online"
        }, { returnDocument: "after" })
        console.log(update)
        return res.status(200).json('Ride Completed ')
    } catch (error) {
        console.log(error)
        return res.status(500).json('internal server error')
    }
}
const todayBookings = async (req, res) => {
    const driver = req.driver
    console.log(driver.stand)
    try {
        const datee = new Date().toLocaleDateString('en-GB');
        console.log(datee);
        const data = await Ride.find({ date: datee, Status: "pending", NearestStation: driver.stand }).sort({ time: 1 })
        console.log(data)

        return res.status(200).json(data)
    } catch (error) {
        console.log(error)
        return res.status(500).json(`internal server error`)
    }
}

const tommarrowsRide = async (req, res) => {
    console.log('tommarrowsRide')
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const formatted = tomorrow.toISOString().split("T")[0];

    const [yyyy, mm, dd] = formatted.split("-");

    const date = dd.concat('/').concat(mm).concat('/').concat(yyyy)
    console.log(date);

    try {
        const data = (await Ride.find({ date: date })).length
        console.log(data)
        return res.status(200).json(data)

    } catch (error) {
        console.log(error)
        return res.status(500).json(`internal server error`)

    }
}
export {
    register, login, toadysMyRide, AddProfile, tommarrowsRide,
    getbook, getDetails, readyTodrive, myRide, finishRide, todayBookings
} 
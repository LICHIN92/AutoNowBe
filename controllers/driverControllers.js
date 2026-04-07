import Driver from "../models/Driver.js"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import Ride from "../models/Ride.js"
import sharp from "sharp"
import fs from 'fs'
import cloudinaryInstance from "../config/Cloudinary.js"
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

        const payload = {
            Name: findData.Name, Mobile: findData.Mobile, stand: findData.stand, pic: findData.profileImage,
            vehicleNumber: findData.vehicleNumber, id: findData._id, Verifed: findData.isVerified
        }


        const token = jwt.sign(payload, process.env.jwt_secret_key)
        return res.status(200).json({ token: token, message: "Log in successful" })
    } catch (error) {
        console.log(error);
        return res.status(500).json(`internel server error`)
    }
}

const NofBookOnMyOwnStation = async (req, res) => {
    console.log('NofBookOnMyOwnStation');

    try {
        const data = await (await Ride.find()).length
        console.log(data);

    } catch (error) {
        console.log(error)
        return res.status(500).json(`internal server error`)
    }
}

const AddProfile = async (req, res) => {
    console.log(req.body);
    console.log(req.id);
    const { stand } = req.body
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

        const data = await Driver.findByIdAndUpdate(req.id,
            { stand: stand, profileImage: pic }, { new: true })

        console.log(data);
        // const originalSize = req.file.buffer.length()

        // const compressedBuffer = await sharp(req.file.buffer)
        //     .resize(500)
        //     .jpeg({ quality: 60 })
        //     .toBuffer()

        // const compressedSize = compressedBuffer.length

        // console.log("Original:", (originalSize / 1024).toFixed(2), "KB")
        // console.log("Compressed:", (compressedSize / 1024).toFixed(2), "KB")



    } catch (error) {
        console.log(error)
        res.status(500).json("Error compressing image")
    }
}
export { register, login, NofBookOnMyOwnStation, AddProfile }
import Driver from "../models/Driver.js"
import bcrypt from "bcryptjs"

const register = async (req, res) => {
    const { vehicleNumber, Name, Mobile, Password, licenceNumber, vehicleType } = req.body
    console.log(req.body)
    try {
        const VehicleExist = await Driver.findOne({ vehicleNumber: vehicleNumber })
        console.log(VehicleExist);

        if (VehicleExist) {
            return res.status(400).json(`${vehicleNumber} vehicle already registered `)
        }
        const SaltRound = 12
        const hashedPassword = await bcrypt.hash(Password, SaltRound)
        console.log(hashedPassword);

        const data =await new Driver({
            Name: Name, Mobile: Mobile, licenseNumber: licenceNumber, vehicleNumber: vehicleNumber,
             vehicleType: vehicleType, Password: hashedPassword
        }).save()
        console.log(data);
            return res.status(200).json(`${vehicleNumber} vehicle succefully registered `)

    } catch (error) {
        return res.status(500).json(`internal server error`)

    }
}


export { register }
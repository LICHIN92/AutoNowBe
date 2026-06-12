import User from "../models/User.js";
import bcrypt from "bcryptjs";
import JWT from 'jsonwebtoken'
import Ride from "../models/Ride.js";
const Signup = async (req, res) => {
    console.log('signup');

    const { Name, Mobile, Password } = req.body
    console.log(req.body);

    try {
        const finduser = await User.findOne({ Mobile: Mobile })
        console.log(finduser);

        if (finduser) {
            console.log('exist number');

            return res.status(409).json(`${Mobile} already has an account`)
        }
        const SaltRound = 10
        const hashedPassword = await bcrypt.hash(Password, SaltRound)
        console.log(hashedPassword);
        const data = await new User({
            Name: Name, Mobile: Mobile, Password: hashedPassword
        }).save()
        console.log(data);

        const payload = {
            Name: Name, Mobile: Mobile, id: data._id, Role: data.Role
        }
        const token = JWT.sign(payload, process.env.jwt_secret_key)
        console.log(token);
        return res.status(200).json({ token: token, message: 'Signup succefully' })

    } catch (error) {
        console.log(error);

        return res.status(500).json(`internal server error`)

    }
}

const SignIn = async (req, res) => {
    console.log('sign in');
    console.log(req.body);

    const { Mobile, Password } = req.body

    try {
        const finduser = await User.findOne({ Mobile: Mobile })

        if (!finduser) {
            console.log('no user')
            return res.status(404).json(`Invalid ${Mobile} `)
        }
        console.log(finduser)
        const matchPassword = await bcrypt.compare(Password, finduser.Password)
        console.log(matchPassword);
        if (!matchPassword) {
            return res.status(400).json(`Invalid password`)

        } else {
            const payload = {
                Name: finduser.Name, Mobile: Mobile, id: finduser._id, Role: finduser.Role
            }
            const token = JWT.sign(payload, process.env.jwt_secret_key)
            console.log(token);
            return res.status(200).json({ token: token, message: 'Succefully Signin' })
        }
    } catch (error) {
        return res.status(500).json(`internal server error`)
    }
}

const Myride = async (req, res) => {
    console.log('helo')
    console.log(req.params.id);
    const id = req.params.id
    try {
        const ride = await Ride.find({ userId: id })
        console.log(ride)
        const data = ride.filter((data, i = 'completed') => (
            data.Status !== 'completed'
        ))
        console.log('data: ', data);

        return res.status(200).json(data)
    } catch (error) {
        console.log(error);
        return res.status(500).json(`internal server error`)
    }
}

const cancelRide = async (req, res) => {
    console.log(req.params.id);

    try {
        const ride = await Ride.findById(req.params.id)
        if (!ride) {
            return res.status(404).json(`this ride is not found`)
        }
        if (ride.Status != 'pending') {
            console.log('accepted')
            return res.status(400).json(`This ride is accepted!\nYou can't delete this ride`)

        }
        const action = await Ride.findByIdAndDelete(req.params.id)
        console.log(action)
        return res.status(200).json("Your ride canceled successfully")
    } catch (error) {
        console.log(error)
        return res.status(500).json(`internal server error`)
    }
}

const getDetails = async (req, res) => {
    console.log('/getDetails')
    console.log(req.query.id)
    const id = req.query.id
    try {
        const data = await Ride.findById(id).populate({
            path: "driverId",
            select: ["Name", "Mobile", "vehicleNumber", "profileImage"]
        });
        console.log(data)
        if (!data) {
            return res.status(400).json(`your ride is not found`)
        }
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json(`internal server error`)
    }
}

const forgotPassword = async (req, res) => {
    console.log('forgot Password');
    console.log(req.body);
    const { Mobile, Password } = req.body
    try {
        const find = await User.find({ Mobile: Mobile })
        console.log(find);
        if (!find) {
            return res.status(404).json(`${Mobile} is not found`)
        }
        const SaltRound = 10
        const hashedPassword = await bcrypt.hash(Password, SaltRound)
        console.log(hashedPassword);
        const updatedUser = await User.findOneAndUpdate(
            { Mobile: Mobile },
            { Password: hashedPassword },
            { return: true }
        );
        console.log(updatedUser)
        return res.status(200).json(
            "Password changed successfully"
        );
    } catch (error) {
        console.log(error);
        return res.status(500).json(`internal server error`)
    }
}
export { Signup, SignIn, Myride, cancelRide, getDetails, forgotPassword }  
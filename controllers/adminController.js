import Driver from "../models/Driver.js";
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
export { addStand, getDriverNumber, usersNumber, stationNumber, verfiedDriver }



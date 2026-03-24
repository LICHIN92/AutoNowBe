import Stand from "../models/stand.js"

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

export { addStand }
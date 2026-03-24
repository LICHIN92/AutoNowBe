import mongoose from "mongoose";

const schema = new mongoose.Schema({
    StandName: {
        type: String,
        unique: true,
    }
})

const Stand = mongoose.model('Stand', schema)
export default Stand
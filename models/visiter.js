import mongoose from "mongoose";

const visitSchema = new mongoose.Schema({
    date: {
        type: String,
        unique: true,
        default: () => new Date().toISOString().split("T")[0]
    },
    count: {
        type: Number,
        default: 0
    }
},
    {
        timestamps: true
    });
const Visiters = mongoose.model("visiters", visitSchema)
export default Visiters
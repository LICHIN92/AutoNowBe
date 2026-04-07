import mongoose from "mongoose";

const rideSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    },
    driverId: {
        type: mongoose.Types.ObjectId,
        ref: 'Driver',
        // required: true
    },
    pickup: {
        type: String,
        required: true
    },
    drop: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    NearestStation: {
        type: String,
        required: true
    },
    Status: {
        type: String,
        enum: ["pending", "accepted", "ongoing", "completed", "cancelled"],
        default: "pending"
    }
}, 
    { timestamps: true } 
);
 
const Ride = mongoose.model("Ride", rideSchema);
export default Ride
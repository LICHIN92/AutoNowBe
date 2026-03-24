import mongoose from "mongoose";

const driverSchema = new mongoose.Schema({

    Name: {
        type: String,
        required: true,
    },

    Mobile: {
        type: String,
        required: true,
        unique: true
    },

    Password: {
        type: String,
        required: true
    },

    vehicleNumber: {
        type: String,
        required: true,
        unique: true
    },

    vehicleType: {
        type: String,
        default: "auto"
    },

    licenseNumber: {
        type: String,
        required: true
    },

    location: {
        lat: Number,
        lng: Number
    },

    status: {
        type: String,
        enum: ["offline", "online", "busy"],
        default: "offline"
    },

    rating: {
        type: Number,
        default: 0
    },

    isVerified: {
        type: Boolean,
        default: false
    },
        profileImage: {
        type: String
    }

}, { timestamps: true });

const Driver = mongoose.model("Driver", driverSchema);

export default Driver;
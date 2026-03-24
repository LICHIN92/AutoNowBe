import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Mobile: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true,
    }, 
    Role: {
        type: String,
        enum: ["user", "driver", "admin"],
        default: "user"
    }
},
    {
        timestamps: true
    }
)

const User = mongoose.model('User', userSchema)
export default User
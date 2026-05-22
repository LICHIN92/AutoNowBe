
import mongoose from "mongoose"; 

const connectDb = async () => {
  // console.log("DB_URL:", process.env.DB_URL);
  try {
    const conn = await mongoose.connect(process.env.DB_URL);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // console.log(error)
    console.error("Database connection failed:", error.message);
    process.exit(1); // stop server if DB fails
  }
};
 
export default connectDb;
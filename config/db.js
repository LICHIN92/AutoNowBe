// import mongoose from "mongoose";

// const connectDb=async()=>{
//     try {
//         await mongoose.connect(process.env.db_url)
//         console.log(`connnected to ${process.env.db_url}`);
        
//     } catch (error) {
//         console.log(error);
        
//     }
// }

// export default connectDb
import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URL);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1); // stop server if DB fails
  }
};

export default connectDb;
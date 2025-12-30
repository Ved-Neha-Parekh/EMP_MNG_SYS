import mongoose from "mongoose";
import dotenv from "./dotenv.js";

const db = async()=>{
    try {
        await mongoose.connect(dotenv.MONGODB_URL);
        console.log("Database connected successfully...");
    } catch (error) {
        console.log("Internal DB error: ",error.message);
    }
}

export default db;
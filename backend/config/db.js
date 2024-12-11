import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected`);
    } catch (error) {
        console.error(`error: ${error.message}`)
        process.exit(1) //1 = error, 0 = success
    }
}
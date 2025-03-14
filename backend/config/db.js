import mongoose from "mongoose";

export const connectionDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB: " + conn.connection.host);
    } catch (error) {

    }
}
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from './routes/authRoutes.js';
const app = express();
dotenv.config();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

    connectDB();

    app.use('/api/auth', authRoutes); //Account creation and Forgot password

console.log(process.env.MONGO_URI);
app.listen(process.env.HOST_PORT, () => {
    console.log("Server started at http://localhost:5000"); //or whatever your port is
})
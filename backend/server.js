import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from './routes/authRoutes.js';
const app = express();
dotenv.config();
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies


app.use(express.json());  
    connectDB();


    app.use('/api/auth', authRoutes);



    
console.log(process.env.MONGO_URI);
app.listen(5000, () => {
    console.log("Server started at http://localhost:5000");
})
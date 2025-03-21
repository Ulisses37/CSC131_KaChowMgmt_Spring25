import express from "express";
import dotenv from "dotenv";
import {connectDB} from "./config/db.js"
dotenv.config();
connectDB();





const app = express();
app.get("/products", (req, res) => {})

app.listen(5000,() =>
{
    console.log("Server is ready at http://localhost:5000")
})
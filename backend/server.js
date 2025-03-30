import express from "express";
import dotenv from "dotenv";
import {connectDB} from "./config/db.js"
import ticketRoutes from "./routes/ticketRoutes.js";
dotenv.config();
connectDB();

const app = express();

app.get("/products", (req, res) => {})

app.use(express.json());

app.use('/api/tickets', ticketRoutes);


app.listen(5000,() =>
{
    console.log("Server is ready at http://localhost:5000")
})
import express from "express";
import dotenv from "dotenv";
import {connectDB} from "./config/db.js"
import ticketRoutes from "./routes/ticketRoutes.js";
import vehicleRoutes from "./routes/vehicleRoutes.js";
dotenv.config();
connectDB();

const app = express();

app.get("/products", (req, res) => {})

app.use(express.json());

app.use('/api/tickets', ticketRoutes);

app.use('/api/vehicles', vehicleRoutes);


app.listen(process.env.HOST_PORT,() =>
{
    console.log("Server is ready at http://localhost:5000")
})
import express from "express";
import dotenv from "dotenv";
import {connectDB} from "./config/db.js"
import ticketRoutes from "./routes/ticketRoutes.js";
import vehicleRoutes from "./routes/vehicleRoutes.js";
import authRoutes  from "./routes/authRoutes.js";

import loginRouter from "./routes/loginRoute.js";
dotenv.config();
connectDB();





const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/products", (req, res) => {})

app.use('/api/auth', authRoutes); //Account creation and Forgot password
app.use('/api/tickets', ticketRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/login', loginRouter);

import mechanicRoutes from './routes/mechanicRoutes.js';
app.use('/api', mechanicRoutes);

app.listen(process.env.HOST_PORT,() =>
{
    console.log("Server is ready at http://localhost:" + process.env.HOST_PORT)
})
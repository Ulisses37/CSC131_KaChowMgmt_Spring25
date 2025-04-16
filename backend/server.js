import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {connectDB} from "./config/db.js"
import ticketRoutes from "./routes/ticketRoutes.js";
import vehicleRoutes from "./routes/vehicleRoutes.js";
import authRoutes  from "./routes/authRoutes.js";
import serviceHistoryRouter from './routes/serviceHistoryRoutes.js';
import employeeRoutes from "./routes/employeeRoutes.js";


import loginRouter from "./routes/loginRoute.js";
dotenv.config();
connectDB();





const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/products", (req, res) => {})

app.use('/api/auth', authRoutes); //Account creation and Password Changing
app.use('/api/service-history', serviceHistoryRouter);
app.use('/api/tickets', ticketRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/login', loginRouter);
app.use('/api/employees', employeeRoutes);


app.listen(process.env.HOST_PORT,() =>
{
    console.log("Server is ready at http://localhost:" + process.env.HOST_PORT)
})
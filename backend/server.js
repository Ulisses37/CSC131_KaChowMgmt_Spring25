import express from "express";
import dotenv from "dotenv";
import {connectDB} from "./config/db.js"
import loginRouter from "./routes/loginRoute.js";
dotenv.config();
connectDB();





const app = express();
app.get("/products", (req, res) => {})
app.use(express.json());
app.use('/api/login', loginRouter);
app.listen(5000,() =>
{
    console.log("Server is ready at http://localhost:5000")
})
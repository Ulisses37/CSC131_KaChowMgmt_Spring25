import express from "express";
import dotenv from "dotenv";

const app = express();
console.log(process.env.MONGODB_URI);

app.listen(5000,() =>
{
    console.log("Server is ready at http://localhost:5000")
})
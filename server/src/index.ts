import express from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app: express.Application = express();

mongoose.connect(process.env.DB_CONNECTION!)
    .then(() => console.log("db connection successful"))
    .catch((err) => console.log(err));



app.listen(PORT, () => console.log("Server running"))
import express from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
const cors = require("cors");

import {router as userRouter} from "./routes/users.js";
import {router as authRouter} from "./routes/auth.js";
import {router as postRouter} from "./routes/posts.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app: express.Application = express();

// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const corsOptions = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

//routes
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);

mongoose.connect(process.env.DB_CONNECTION!)
    .then(() => console.log("db connection successful"))
    .catch((err) => console.log(err));

app.listen(PORT, () => console.log("Server running"))
import express from "express";
import cors from "cors";
import morgan from "morgan";

import { connectDB, connectServer } from "./config";
import errorHandlerMiddleware from "./middlewares/errorHandling";
import notFoundMiddleware from "./middlewares/notFound";
import userRouter from "./routes/user";

const app = express();

// Middlewares
app.use(express.json()); // To parse the incoming requests with JSON payloads
app.use(cors());
app.use(morgan("tiny"));

// Routes
app.use("/user", userRouter);

// Config
app.use(notFoundMiddleware); // For handling not found routes
app.use(errorHandlerMiddleware()); // For handling errors

// Connection
connectDB(); // Connect to MongoDB
connectServer(app); // Connect to Server


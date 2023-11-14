import express from "express";
import { connectDB, connectServer } from "./config";
import errorHandlerMiddleware from "./middlewares/errorHandling";
import notFoundMiddleware from "./middlewares/notFound";

const app = express();

// Middlewares
app.use(express.json()); // To parse the incoming requests with JSON payloads

// Config
app.use(notFoundMiddleware()); // For handling not found routes
app.use(errorHandlerMiddleware()); // For handling errors

// Connection
connectDB(); // Connect to MongoDB
connectServer(app); // Connect to Server
import express from "express";
import cors from "cors";
import morgan from "morgan";

import { connectDB, connectServer } from "./config";
import errorHandlerMiddleware from "./middlewares/errorHandling";
import notFoundMiddleware from "./middlewares/notFound";
import userRouter from "./routes/user";
const userAuthGoogle = require("./routes/authRouteGoogle")
const userAuth = require("./routes/authRoute")
require("dotenv").config()

const app = express();

// Middlewares
app.use(express.json()); // To parse the incoming requests with JSON payloads
app.use(cors());
app.use(morgan("tiny"));

//passport js
const cookieParser = require("cookie-parser")
const session = require('express-session')
const passport = require("passport")
const passportSetup = require("./controllers/config/passport")

app.use(cookieParser())

app.use(session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

// Routes
app.use("/admin", userAuth)
app.use("/auth/google", userAuthGoogle)
app.use("/user", userRouter);

// Config
app.use(notFoundMiddleware); // For handling not found routes
app.use(errorHandlerMiddleware()); // For handling errors

// Routes
app.use("/user", userRouter);

// Connection
connectDB(); // Connect to MongoDB
connectServer(app); // Connect to Server


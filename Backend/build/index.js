"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const config_1 = require("./config");
const errorHandling_1 = __importDefault(require("./middlewares/errorHandling"));
const notFound_1 = __importDefault(require("./middlewares/notFound"));
const user_1 = __importDefault(require("./routes/user"));
const userAuth = require("./routes/authRoute");
require("dotenv").config();
const app = (0, express_1.default)();
// Middlewares
app.use(express_1.default.json()); // To parse the incoming requests with JSON payloads
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("tiny"));
//passport js
const session = require('express-session');
const passport = require("passport");
const passportSetup = require("./controllers/config/passport");
app.use(session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
// Routes
app.use("/user", user_1.default);
app.use("/auth/google", userAuth);
// Config
app.use(notFound_1.default); // For handling not found routes
app.use((0, errorHandling_1.default)()); // For handling errors
// Routes
app.use("/user", user_1.default);
// Connection
(0, config_1.connectDB)(); // Connect to MongoDB
(0, config_1.connectServer)(app); // Connect to Server

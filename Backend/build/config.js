"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectServer = exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
// Connect MongoDB at mongoURL or default port 27017.
const connectDB = () => {
    const mongodb_url = process.env.MONGODB_URL || "mongodb://127.0.0.1:27017";
    mongoose_1.default.connect(mongodb_url, {})
        .then(() => {
        console.log("MongoDB Connection Succeeded.");
    })
        .catch((error) => {
        if (!error) {
            console.log("MongoDB Connection Succeeded");
        }
        else {
            throw new Error("Error in DB connection: " + error);
        }
    });
};
exports.connectDB = connectDB;
// Connect Server at default port 8000.
const connectServer = (app) => {
    const PORT = process.env.PORT || 8000;
    try {
        app.listen(PORT, () => console.log(`Server running on http://127.0.0.1:${PORT}/.`));
    }
    catch (error) {
        throw new Error("Error in server connection: " + error);
    }
};
exports.connectServer = connectServer;

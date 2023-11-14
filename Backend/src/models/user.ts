import mongoose, { Schema, model } from "mongoose";
import IUser from "../interfaces/user";

const userSchema = new Schema<IUser>({
    fullName: { type: String, required: true },
    email: { type: String, required: true }
});

export default mongoose.model("User", userSchema);
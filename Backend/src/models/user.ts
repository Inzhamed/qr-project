import mongoose, { Schema } from "mongoose";
import IUser from "../interfaces/user";
import { generateRandomString } from "../logic/qrcode";


const userSchema = new Schema<IUser>({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    secret: { type: String, required: true, default: generateRandomString(16) },
    qrcode: {type: Buffer, reed: true },
    password: {type: String}
});

export default mongoose.model("User", userSchema);
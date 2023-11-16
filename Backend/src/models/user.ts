import mongoose, { Schema } from "mongoose";
import IUser from "../interfaces/user";
import { generateRandomString } from "../logic/qrcode";
import qrcode from 'qrcode'

const userSchema = new Schema<IUser>({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    secret: { type: String, required: true, default: generateRandomString(16) },
    qrCode: { type: ArrayBuffer }
});

export default mongoose.model("User", userSchema);
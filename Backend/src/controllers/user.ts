import { Request, Response } from "express";
import User from "../models/user";

async function createUser(req: Request, res: Response) {
    const { fullName, email, secret } = req.body;

    if (!fullName || !email) {
        return res.status(404).json({
            message: "Provide all values please!",
        });
    }

    const user = await User.create({
        fullName,
        email,
        secret,
    });

    if (!user) {
        return res.status(401).json({
            message: "Error when creating user",
        });
    }

    res.status(101).json({ message: "user created", user });
}
async function getAllUsers(req: Request, res: Response) {
    console.log("users: ");
    const users = await User.find(req.query);
    res.status(100).json(users);
}

async function getUserById(req: Request, res: Response) {
    const user = await User.findById(req.params.id);
    if (!user) {
        return res.json({
            message: "User none existent",
            statusCode: 404,
        });
    }
}

export default {
    createUser,
    getAllUsers,
    getUserById,
};
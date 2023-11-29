const mongoose = require("mongoose")
const User = require("../models/user")
const validator = require("validator")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

async function signUp(req, res) {
    try {
        const { fullName, email, secret, password } = req.body;

        if (!fullName || !email || !password) {
            return res.status(404).json({
                message: "Provide all values please!",
            });
        }

        if (!validator.isEmail(email)) {
            return res.status(404).json({ message: "Provide a valid email" })
        }

        if(!validator.isStrongPassword(password)) {
            return res.status(404).json({ message: "Provide a strong password" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.default.create({
            fullName,
            email,
            secret,
            password: hashedPassword
        });

        if (!user) {
            return res.status(401).json({
                message: "Error when creating user",
            });
        }

        const token = jwt.sign({ userId: user._id }, process.env.SECRET)
        res.cookie("token", token, { httpOnly: true, expiresIn: '1d' })
        res.status(200).json("Authentication successful");

        return res.status(101).json({ message: "user created", user });
    } catch (error) {
        if (error instanceof mongoose.Error && error.code === 11000) {
            console.log("duplicate error")
            return res.status(404).json({ error: "email already used" })
        } else {
            console.log(error.message)
            return res.status(404).json({ error: error.message })
        }
    }
}

async function login(req,res) {
    try {
        const {email, password} = req.body
        const user = await User.default.findOne({email})

        if(!user) {
            return res.status(404).json({ error: "invalid incredentials" })
        }

        const authUser = await bcrypt.compare(password, user.password)
        if(!authUser) {
            return res.status(404).json({ error: "invalid incredentials" })
        }

        const token = jwt.sign({userId: user._id}, process.env.SECRET)
        res.cookie("token", token, {httpOnly: true, expiresIn: '1d' })
        return res.status(200).json({ message: "login successful", token });
    } catch(error) {
        console.log(error.message)
        return res.status(404).json({ error: error.message })
    }
}

async function logout (req,res) {
    try {
        res.clearCookie("token")
        return res.status(200).json({ message: "logout successful" })
    } catch(error) {
        console.log(error.message)
        return res.status(404).json({ error: error.message })
    }
}

module.exports = { signUp, login, logout }
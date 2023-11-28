const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken")

const router = express.Router();

const adminMid = (req,res,next) => {
    const token = req.cookies.token
  
    if(token) {
      const verifiedToken = jwt.verify(token, process.env.SECRET)
      if(verifiedToken) {
        return
      }
    }
    next()
  }

router.get('/', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get("/redirect",adminMid, passport.authenticate("google"), (req, res) => {
    const token = jwt.sign({userId: req.user._id}, process.env.SECRET)
    res.cookie("token", token, {httpOnly: true, expiresIn: '1d' })
    res.status(200).json("Authentication successful");
});



module.exports = router;
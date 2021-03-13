const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const User = mongoose.model("User")

const router = express.Router();

router.post("/signUp", async (req, res) => {
    const {email, password} = req.body
    try {
        const user = new User({email, password})
        await user.save()
        const token = jwt.sign({userId: user._id}, "MY_SECRET_KEY")

        res.status(200).send({token})
    } catch (error) {
        console.log(error.message);
        res.status(422).send({error: "You must be logged in"})
    }
})

router.post("/signIn", async (req, res) => {
    const {email, password} = req.body

    if (!email || !password) {
        return res.status(422).send({error: "Must provide an email or password"})
    }

    const user = await User.findOne({email});

    if (!user) {
        return res.status(422).send({error: "Invalid email or password"})
    }
    try {
        await user.comparePassword(password)
        const token = jwt.sign({userId: user._id}, "MY_SECRET_KEY")
        return res.status(200).send({token})

    } catch (error) {
        return res.status(422).send({error: "Invalid email or password"})
    }
    
})

module.exports = router
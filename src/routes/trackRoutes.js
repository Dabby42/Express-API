const express = require('express');
const verifyAuth = require("../middlewares/verifyAuth")
const mongoose = require("mongoose")
const Track = mongoose.model("Track");
const router = express.Router();

router.use(verifyAuth);

router.get("/tracks", async (req, res) => {
    const tracks = await Track.find({});

    res.status(200).send(tracks)
})

router.post("/tracks", async (req, res) => {
    const {name, location} = req.body

    if (!name || !location) {
        return res.status(422).send({error: "Must provide a name and a location"})
    }
    const userId = req.user._id;
    console.log(userId);
    try {
        const newTrack = new Track({userId, name, location});
        await newTrack.save();
        res.status(200).send({success: "New track creates successfully"}) 
    } catch (error) {
        res.status(422).send({error: error.message})
    }
  
})

module.exports = router

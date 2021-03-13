const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = mongoose.model("User")

module.exports = (req, res, next) => {
    const {authorization} = req.headers

    if (!authorization) {
        return res.status(401).send({error: "You must be logged in"})
    }

    const token = authorization.replace("Bearer ","");
    jwt.verify(token, "MY_SECRET_KEY", async(err, payload)=> {
        if (err) {
            return res.status(401).send({error: "You must be logged in"})
        }

        const id = payload.userId;
        req.user = await User.findById({_id:id})

        next();
        
    });
    
}

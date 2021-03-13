require("./models/Track")
require("./models/user")
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const trackRoutes = require("./routes/trackRoutes")
const verifyAuth = require("./middlewares/verifyAuth")
const app = express();

app.use(bodyParser.json());

mongoose.connect("mongodb+srv://database:passwordpassword@cluster0.36vuz.mongodb.net/rn?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

mongoose.connection.on("connected", () => {
    console.log("MongoDB Connected!");
})

mongoose.connection.on("error", (err) => {
    console.error("MongoDB coudn't connect", err);
})

app.get("/", verifyAuth, (req, res) => {
    res.send("Hi there!")
})

app.use(authRoutes);
app.use(trackRoutes);

app.listen(3000, () => {
    console.log("Listening on port 3000");
})
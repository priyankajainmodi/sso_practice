require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const auth = require("./middleware/auth");
const cookieParser = require("cookie-parser");
const app = express();
app.use(express.json());
app.post("/register", async(req, res) => {
    res.redirect('http://localhost:8000/register');
});
app.use(cookieParser());
app.post("/welcome", auth, (req, res) => {
    const id = req._id;
    const mail = req.email;
    res.json({ userId: id, email: mail });
});


app.post("/login", async(req, res) => {
    res.redirect("http://localhost:8000/login");
})
app.get("/logout", auth, (req, res) => {
    return res
        .clearCookie("access_token")
        .status(200)
        .json({ message: "Successfully logged out " });
});

module.exports = app;
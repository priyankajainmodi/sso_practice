require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const auth = require("./middleware/auth");
const cookieParser = require("cookie-parser");
const app = express();
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(cookieParser());
app.get("/welcome", auth, (req, res) => {
    res.render("welcome");
});
app.get("/logout", auth, (req, res) => {
    res.clearCookie("access_token");
    console.log("successfully logged out");
    res.render("home");
});
app.get("/", (req, res) => {
    res.render("home");
})
module.exports = app;
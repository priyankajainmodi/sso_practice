require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const User = require("./model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const app = express();
app.set("views", "./views");
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded());
app.get('/register', (req, res) => {
    res.render(register);
})
app.post("/register", async(req, res) => {
        const { first_name, last_name, email, password } = req.body;
        if (!(email && password && first_name && last_name)) {
            res.status(400).send("All fields are required");
        }
        try {
            const existUser = await User.findOne({ email });
            let encryptedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({
                first_name,
                last_name,
                email: email.toLowerCase(),
                password: encryptedPassword


            });

            const token = jwt.sign({ user_id: user._id, email },
                process.env.TOKEN_KEY, {
                    expiresIn: "2h",
                }
            );
            user.token = token;
            return res.cookie("access_token", token, {
                    httpOnly: true
                })
                .status(200)
                .json({ message: "registered in successfully" });

        } catch {
            res.send("user with this email already exist...please login");

        }
    }


);
app.get("/logout", (req, res) => {
    return res
        .clearCookie("access_token")
        .status(200)
        .json({ message: "Successfully logged out " });
});
app.get("/login", (req, res) => {
    res.render("login");
})
app.post("/login", async(req, res) => {
    console.log(req);
    const { email, pwd } = req.body;
    console.log(email + " " + pwd);
    if (!(email && pwd)) {
        res.send("All fields are  required");
    }
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(pwd, user.password))) {
        const token = jwt.sign({ user_id: user._id, email },
            process.env.TOKEN_KEY, {
                expiresIn: "2h",
            }
        );
        user.token = token;
        console.log(user);
        res.cookie("access_token", token, {
            httpOnly: true
        });
        res.redirect("http://localhost:3000/welcome");
    }
})


module.exports = app;
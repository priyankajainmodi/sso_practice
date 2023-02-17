const jwt = require("jsonwebtoken");
const config = process.env;

const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    console.log(token);
    if (!token) {
        console.log("login to have access to resource");
        res.render("home");
    }
    try {
        const data = jwt.verify(token, config.TOKEN_KEY);
        console.log(data);
        req.userId = data.id;
        req.email = data.email;
        return next();
    } catch {
        return res.status(403).send("access denied");
    }
};
module.exports = verifyToken;
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const generateToken = async({username,email,userId})=>{
    return jwt.sign(
        {username,email,userId},
        process.env.SECRET_KEY,
        {expiresIn : "3h"},
    )
};

module.exports = generateToken;
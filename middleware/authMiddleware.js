const jwt = require("jsonwebtoken");
const dotenv = require("dotenv")
dotenv.config()

const verifyToken = (req,res,next)=>{
    const token = req.cookies.token

    if (!token) return res.status(401).json({message : "Token not found",loggedIn : false})

    try {
        const decoded = jwt.verify(token,process.env.SECRET_KEY);
        req.user = decoded
        next()
    }catch (err) {
        return res.status(401).json({loggedIn : false, message: "Invalid or expired token",err });
    }   

}

module.exports = verifyToken;
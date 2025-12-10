const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const generateToken = require("../Services/generateToken");

const signUp = async (req, res) => {
    const { username, email, password } = req.body
    if (!username || !email || !password)
        return res.status(400).json({ message: "Fill all required fields" });

    try {
        const userExist = await User.findOne({ email })
        if (userExist)
            return res.status(409).json({ message: "Email already exists" });

        const hashPassword = await bcrypt.hash(password, 10)
        console.log("Password hashed", hashPassword)

        const user = await User.create({
            username,
            email,
            password: hashPassword,
        })

        const token = await generateToken({
            username: user.username,
            email: user.email,
            userId: user._id
        });

        res.cookie("token", token);

        return res.status(201).json({
            LoggedIn: true,
            user: {
                username: user.username,
                email: user.email,
            }
        })
    } catch (err) {
        res.status(500).json({ message: "Server Error from SignUp", err, LoggedIn: false })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password)
        return res.status(400).json({ message: "Fill all required fields" });

    try {
        const user = await User.findOne({ email })
        if (!user)
            return res.status(404).json({ message: "User not found" });

        const isCorrect = await bcrypt.compare(password, user.password)
        if (!isCorrect)
            return res.status(400).json({ message: "Invalid Password" });

        const token = await generateToken({
            username: user.username,
            email: user.email,
            userId: user._id
        })

        res.cookie("token", token)

        return res.status(200).json({
            LoggedIn: true,
            user: {
                username: user.username,
                email: user.email
            }
        })
    } catch (err) {
        res.status(500).json({ message: "Server Error from Login", err, LoggedIn: false })
    }
}

const getAllusers = async (req, res) => {
    try {
        const users = await User.find().select("-password");

        if (users.length === 0) {
            return res.status(204).json({
                message: "No users found",
                success: false
            });
        }

        return res.status(200).json({
            success: true,
            users
        });

    } catch (err) {
        return res.status(500).json({
            message: "Server error",
            error: err
        });
    }
};


module.exports = { signUp, login, getAllusers }
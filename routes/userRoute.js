const express = require("express")
const { signUp, login, getAllusers } = require("../controllers/user")
const verifytoken = require("../middleware/authMiddleware")
const router = express.Router()

router.post("/signup", signUp)
router.post("/login", login)
router.get("/all",getAllusers);
router.get("/me", verifytoken, (req, res) => {
    res.json({
        loggedIn: true,
        user: {
            username: req.user.username,
            email: req.user.email,
            userId: req.user.userId
        }
    })
})
router.post("/logout", (req, res) => {
    res.clearCookie("token");

    return res.json({
        message: "Logged out successfully",
        loggedIn: false
    });
});


module.exports = router


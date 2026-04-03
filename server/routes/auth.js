const router = require('express').Router();
const authCntrl = require("../controllers/auth");
const rateLimit = require("express-rate-limit");

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 20,
    message: { message: "Too many attempts, please try again later" }
});

router.post("/auth/signup", authLimiter, authCntrl.auth_signup_post);
router.post("/auth/signin", authLimiter, authCntrl.auth_signin_post);
router.get("/auth/user", authCntrl.auth_show_get);

module.exports = router;
const router = require('express').Router();
const authCntrl = require("../controllers/auth");

router.post("/auth/signup", authCntrl.auth_signup_post);
router.post("/auth/signin", authCntrl.auth_signin_post);

module.exports = router;
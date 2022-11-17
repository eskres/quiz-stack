const router = require('express').Router();
const authCntrl = require("../controllers/auth");

router.post("/auth/signup", authCntrl.auth_signup_post);
router.post("/auth/signin", authCntrl.auth_signin_post);
router.get("/auth/user", authCntrl.auth_show_get);

module.exports = router;
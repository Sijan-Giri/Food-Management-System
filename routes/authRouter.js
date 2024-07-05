const { registerUser, loginUser, forgetPassword, verifyOtp } = require('../controller/auth/authController');

const router = require('express').Router();

router.route('/register').post(registerUser);
router.route("/login").post(loginUser);
router.route("/forgetPassword").post(forgetPassword);
router.route("/verifyOtp").post(verifyOtp);


module.exports = router;
const { initiateKhaltiPayment } = require('../controller/user/payment/paymentController');
const isAuthenticated = require('../middleware/isAuthenticated');
const catchAsync = require('../services/catchAsync');

const router = require('express').Router();

router.route("/payment").post(isAuthenticated,catchAsync(initiateKhaltiPayment))


module.exports = router;
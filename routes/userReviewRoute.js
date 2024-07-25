const { getReview, createReview } = require("../controller/user/userController");
const isAuthenticated = require("../middleware/isAuthenticated");
const catchAsync = require("../services/catchAsync");

const router = require("express").Router();

router.route("/review/:id").get(catchAsync(getReview)).post( isAuthenticated ,catchAsync(createReview));

module.exports = router
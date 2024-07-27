
const { getReview, createReview, getMyReviews, editReview } = require("../controller/user/review/reviewController");
const isAuthenticated = require("../middleware/isAuthenticated");
const catchAsync = require("../services/catchAsync");


const router = require("express").Router();

router.route("/review/:id")
.get(catchAsync(getReview))
.post( isAuthenticated ,catchAsync(createReview))
.patch(isAuthenticated,catchAsync(editReview))

router.route("/reviews").get(isAuthenticated,catchAsync(getMyReviews))

module.exports = router
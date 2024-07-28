const { getMyProfile, updateMyProfile, deleteProfile, updateMyPassword } = require("../controller/user/profile/profileController");
const isAuthenticated = require("../middleware/isAuthenticated");
const catchAsync = require("../services/catchAsync");

const router = require("express").Router();

router.route("/getProfile").get(isAuthenticated,catchAsync(getMyProfile));
router.route("/updateProfile").patch(isAuthenticated,catchAsync(updateMyProfile));
router.route("/deleteProfile").delete(isAuthenticated,catchAsync(deleteProfile));
router.route("/updatePassword").patch(isAuthenticated,catchAsync(updateMyPassword));


module.exports = router;
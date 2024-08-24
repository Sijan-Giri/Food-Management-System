const { addToCart, getCart, deleteFromCart, updateCartItem } = require("../controller/user/cart/cartController");
const isAuthenticated = require("../middleware/isAuthenticated");
const catchAsync = require("../services/catchAsync");

const router = require("express").Router()


router.route("/addCart/:id").post(isAuthenticated,catchAsync(addToCart));
router.route("/getCart").get(isAuthenticated,catchAsync(getCart));
router.route("/deleteCart/:id").delete(isAuthenticated,catchAsync(deleteFromCart));
router.route("/updateCart/:productId").patch(isAuthenticated,catchAsync(updateCartItem))


module.exports = router;
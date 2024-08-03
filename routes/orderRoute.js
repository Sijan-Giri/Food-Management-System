const { createOrder, getMyOrders, updateMyOrder, deleteMyOrder, cancelMyOrder } = require("../controller/user/order/orderController");
const isAuthenticated = require("../middleware/isAuthenticated");
const toRestrict = require("../middleware/toRestrict");
const catchAsync = require("../services/catchAsync");

const router = require("express").Router();

router.route("/createOrder").post(isAuthenticated,catchAsync(createOrder));
router.route("/getMyOrder").get(isAuthenticated,catchAsync(getMyOrders));
router.route("/updateMyOrder/:id").patch(isAuthenticated,catchAsync(updateMyOrder));
router.route("/deleteMyOrder/:id").delete(isAuthenticated,catchAsync(deleteMyOrder));
router.route("/cancelMyOrder/:id").patch(isAuthenticated,catchAsync(cancelMyOrder));

module.exports = router;

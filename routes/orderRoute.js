const { getOrders } = require("../controller/admin/order/orderController");
const { createOrder, getMyOrders, updateMyOrder, deleteOrder, cancelOrder } = require("../controller/user/order/orderController");
const isAuthenticated = require("../middleware/isAuthenticated");
const toRestrict = require("../middleware/toRestrict");
const catchAsync = require("../services/catchAsync");

const router = require("express").Router();

router.route("/createOrder").post(isAuthenticated,catchAsync(createOrder));
router.route("/getMyOrder").get(isAuthenticated,catchAsync(getMyOrders));
router.route("/getOrders").get(isAuthenticated,toRestrict("admin"),catchAsync(getOrders));
router.route("/updateMyOrder/:id").patch(isAuthenticated,catchAsync(updateMyOrder));
router.route("/deleteOrder/:id").delete(isAuthenticated,catchAsync(deleteOrder));
router.route("/cancelOrder/:id").patch(isAuthenticated,catchAsync(cancelOrder));

module.exports = router;
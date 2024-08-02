const { getOrders, getSingleOrder, updateOrderStatus, deleteOrder } = require("../controller/admin/order/orderController");
const { createOrder, getMyOrders, updateMyOrder, deleteMyOrder, cancelMyOrder } = require("../controller/user/order/orderController");
const isAuthenticated = require("../middleware/isAuthenticated");
const toRestrict = require("../middleware/toRestrict");
const catchAsync = require("../services/catchAsync");

const router = require("express").Router();

router.route("/createOrder").post(isAuthenticated,catchAsync(createOrder));
router.route("/getMyOrder").get(isAuthenticated,catchAsync(getMyOrders));
router.route("/getOrders").get(isAuthenticated,toRestrict("admin"),catchAsync(getOrders));
router.route("/updateMyOrder/:id").patch(isAuthenticated,catchAsync(updateMyOrder));
router.route("/deleteMyOrder/:id").delete(isAuthenticated,catchAsync(deleteMyOrder));
router.route("/cancelMyOrder/:id").patch(isAuthenticated,catchAsync(cancelMyOrder));
router.route("/getSingleOrder/:id").get(isAuthenticated,toRestrict("admin"),catchAsync(getSingleOrder));
router.route("/updateOrderStatus/:id").patch(isAuthenticated,toRestrict("admin"),catchAsync(updateOrderStatus));
router.route("/deleteOrder/:id").delete(isAuthenticated,toRestrict("admin"),catchAsync(deleteOrder))

module.exports = router;

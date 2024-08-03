const { getOrders, getSingleOrder, updateOrderStatus, deleteOrder } = require("../controller/admin/order/orderController");
const isAuthenticated = require("../middleware/isAuthenticated");
const toRestrict = require("../middleware/toRestrict");
const catchAsync = require("../services/catchAsync");

const router = require("express").Router();


router.route("/getOrders").get(isAuthenticated,toRestrict("admin"),catchAsync(getOrders));
router.route("/getSingleOrder/:id").get(isAuthenticated,toRestrict("admin"),catchAsync(getSingleOrder));
router.route("/updateOrderStatus/:id").patch(isAuthenticated,toRestrict("admin"),catchAsync(updateOrderStatus));
router.route("/deleteOrder/:id").delete(isAuthenticated,toRestrict("admin"),catchAsync(deleteOrder))

module.exports = router;
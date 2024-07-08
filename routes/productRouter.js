const { createProduct } = require("../controller/admin/product/productController");
const isAuthenticated = require("../middleware/isAuthenticated");
const toRestrict = require("../middleware/toRestrict");

const router = require("express").Router();

router.route("/createProduct").post(isAuthenticated ,toRestrict("admin"), createProduct);


module.exports = router;
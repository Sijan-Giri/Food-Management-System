const { createProduct } = require("../controller/admin/product/productController");

const router = require("express").Router();

router.route("/createProduct").post(createProduct);


module.exports = router;
const { createProduct, getProducts, getProduct } = require("../controller/admin/product/productController");
const isAuthenticated = require("../middleware/isAuthenticated");
const toRestrict = require("../middleware/toRestrict");

const router = require("express").Router();
const {multer , storage} = require("../middleware/multerConfig");
const catchAsync = require("../services/catchAsync");
const upload = multer({storage : storage})

router.route("/createProduct").post(isAuthenticated ,toRestrict("admin"),upload.single("productImage"), catchAsync(createProduct))
.get(catchAsync(getProducts))

router.route("/getProduct/:id").get(catchAsync(getProduct));

module.exports = router;
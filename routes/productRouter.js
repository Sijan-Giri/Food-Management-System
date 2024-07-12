const { createProduct, getProducts, getProduct } = require("../controller/admin/product/productController");
const isAuthenticated = require("../middleware/isAuthenticated");
const toRestrict = require("../middleware/toRestrict");

const router = require("express").Router();
const {multer , storage} = require("../middleware/multerConfig");
const upload = multer({storage : storage})

router.route("/createProduct").post(isAuthenticated ,toRestrict("admin"),upload.single("productImage"), createProduct)
.get(getProducts)

router.route("/getProduct/:id").get(getProduct);

module.exports = router;
const { createProduct, deleteProduct, editProduct, updateProductStatus, updateProductStockAndPrice } = require("../controller/admin/product/productController");
const isAuthenticated = require("../middleware/isAuthenticated");
const toRestrict = require("../middleware/toRestrict");

const router = require("express").Router();
const {multer , storage} = require("../middleware/multerConfig");
const catchAsync = require("../services/catchAsync");
const { getProduct, getProducts } = require("../controller/global/globalController");

const upload = multer({storage : storage})

router.route("/createProduct").post(isAuthenticated ,toRestrict("admin"),upload.single("productImage"), catchAsync(createProduct))
.get(catchAsync(getProducts))

router.route("/getProduct/:id").get(catchAsync(getProduct));
router.route("/deleteProduct/:id").delete( isAuthenticated,toRestrict("admin"),upload.single("productImage"),catchAsync(deleteProduct));
router.route("/editProduct/:id").patch(isAuthenticated,toRestrict("admin"),upload.single("productImage"),catchAsync(editProduct));
router.route("/updateProductStatus/:id").patch(isAuthenticated,toRestrict("admin"),catchAsync(updateProductStatus))
router.route("/updateStockAndPrice/:id").patch(isAuthenticated,toRestrict("admin"),catchAsync(updateProductStockAndPrice))

module.exports = router;
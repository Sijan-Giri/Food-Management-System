const router = require("express").Router();

const isAuthenticated = require("../middleware/isAuthenticated");
const toRestrict = require("../middleware/toRestrict");
const DataServices = require("../controller/admin/misc/dataService")

router.route("/getAllData").get(isAuthenticated,toRestrict("admin"), DataServices.getData);

module.exports = router;
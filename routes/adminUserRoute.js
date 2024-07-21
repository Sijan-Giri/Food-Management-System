const { getUsers, deleteUser } = require("../controller/user/userController");
const isAuthenticated = require("../middleware/isAuthenticated");
const toRestrict = require("../middleware/toRestrict");

const router = require("express").Router();

router.route("/getUser").get(isAuthenticated,toRestrict("admin"),getUsers);
router.route("/deleteUser/:id").delete(isAuthenticated,toRestrict("admin"),deleteUser)

module.exports = router;
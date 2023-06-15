const express = require("express");
const router = express.Router();

const UserController = require("../controllers/user");

router.get("/", UserController.Index);
router.patch("/", UserController.Update);

module.exports = router;
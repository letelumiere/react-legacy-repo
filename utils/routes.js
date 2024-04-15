const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.Controller");
const instanceController = require("../controllers/instance.controller");
const chatController = require("../controllers/chat.controller");

router.post("/instance/create", instanceController.createInstance);
router.get("/instance/search", "");

router.get("/user/search", "");

module.exports = router;
const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.Controller");
const instanceController = require("../controllers/instance.controller");
const chatController = require("../controllers/chat.controller");

router.post("/create", instanceController.createInstance);
router.get("/join", instanceContoller.joinInstance);
router.get("/test", instanceController.createTest);

module.exports = routes;
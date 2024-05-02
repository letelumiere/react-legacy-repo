const express = require("express");
const routes = express.Router();

const userController = require("../controllers/user.controller");
const roomController = require("../controllers/room.controller");
const chatController = require("../controllers/chat.controller");


module.exports = routes;
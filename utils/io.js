const userController = require("../controllers/User.controller");
const roomController = require("../controllers/Room.contoller");
const chatController = require("../controllers/Chat.contoller");


const express = require("express");
const mongoose = require("mongoose");
const Room = require("./Models/room");

require('dotenv').config();

const cors = require("cors");
const app = express();
app.use(cors());

const express = require("express");
const mongoose = require("mongoose");
const Room = require("./models/room");

require('dotenv').config();

const cors = require("cors");
const app = express();
const routes = require("./utils/routes");
const userController = require("./controllers/user.controller");

app.use(cors());
app.use(express.json());    //json 통신 시 필요. 
app.use("/",routes); //app.getPostPut etc... or 

mongoose
    .connect(process.env.DB, {})
    .then(() => console.log("connected to database"))
    .catch((error) => console.error("database connection error:", error)); // MongoDB 연결 오류 처리

module.exports = app;

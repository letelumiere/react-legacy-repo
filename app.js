const express = require("express");
const mongoose = require("mongoose");
const Room = require("./models/room");
const Instance = require("./models/instance");

require('dotenv').config();

const cors = require("cors");
const app = express();
app.use(cors());

mongoose
    .connect(process.env.DB, {})
    .then(() => console.log("connected to database"))
    .catch((error) => console.error("database connection error:", error)); // MongoDB 연결 오류 처리

    // "/" 경로에 대한 GET 요청을 처리하는 핸들러
app.get("/", async (req, res) => {
    try {
        // 여러 개의 room을 한꺼번에 생성하고 데이터베이스에 추가
        const rooms = await Room.insertMany([
            {
                room: "자바스크립트 단톡방",
                members: [],
            },
            {
                room: "리액트 단톡방",
                members: [],
            },
            {
                room: "NodeJS 단톡방",
                members: [],
            },
        ]);

        res.send(rooms); // 모든 room이 추가된 후에 클라이언트에게 응답을 보냄

    } catch (error) {
        console.error("error while creating rooms:", error);
        res.status(500).send("error while creating rooms"); // 오류 발생 시 클라이언트에게 500 에러 응답
    }
});

module.exports = app;


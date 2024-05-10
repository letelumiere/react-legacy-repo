const express = require("express");
const mongoose = require("mongoose");
const Room = require("./models/room");

require('dotenv').config();

const cors = require("cors");
const app = express();
const routes = require("./utils/routes");
const userController = require("./controllers/user.controller");

app.use(cors());

mongoose
    .connect(process.env.DB, {})
    .then(() => console.log("connected to database"))
    .catch((error) => console.error("database connection error:", error)); // MongoDB 연결 오류 처리

    // "/" 경로에 대한 GET 요청을 처리하는 핸들러

// "/" 경로에 대한 GET 요청을 처리하는 핸들러
app.get("/", async (req, res) => {
    try {
        // 여러 개의 room을 한꺼번에 생성하고 데이터베이스에 추가
        const rooms = await Room.insertMany([
            {
                room: "중앙극장 단톡방",
                members: [],
            },
            {
                room: "우미관 단톡방",
                members: [],
            },
            {
                room: "백병원 단톡방",
                members: [],
            },
        ]);

        res.send(rooms); // 모든 room이 추가된 후에 클라이언트에게 응답을 보냄

    } catch (error) {
        console.error("error while creating rooms:", error);
        res.status(500).send("error while creating rooms"); // 오류 발생 시 클라이언트에게 500 에러 응답
    }
});

app.post("/register", async (req, res) => {
    try {
        const responseData = { message: "Request received successfully" };
        console.log("hi");
        // 추가적인 작업 수행
        
        res.status(200).json(responseData);// 응답 보내기
    } catch(error) {
        console.error("Error:", error);
        res.status(500).json({error: "Error occurred while processing request"}); // 오류 응답 보내기
        //그냥 .send로 전송시, html로 통신함. 
    }
});


module.exports = app;

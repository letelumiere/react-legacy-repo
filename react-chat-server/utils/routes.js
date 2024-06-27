const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");
const roomController = require("../controllers/room.controller");
const chatController = require("../controllers/chat.controller");

router.post("/register", async (req, res) => {
    try {
        console.log(req.body);
        const {email, password, sid} = req.body;    //sid = socketId
        await userController.register({email, password, sid});
    
        const responseData = { message: "Request received successfully" };

        res.status(200).json(responseData);// 응답 보내기
    } catch(error) {
        console.error("Error:", error);
        res.status(500).json({error: "Error occurred while processing request"}); // 오류 응답 보내기  //그냥 .send로 전송시, html로 통신함. 
    }
});

router.post("/login", async (req, res) => {
    try {
        const {email, password, sid} = req.body;
        console.log("router responded =", email, password, sid);
        await userController.login({email, password, sid});

        const responseData = { message: "Request received successfully" };
        res.status(200).json(responseData);
    } catch(error) {
        console.error("Error:", error);
        res.status(500).json({error: "Error occurred while processing request"});
    }
});


module.exports = router;
const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");
const roomController = require("../controllers/room.controller");
const chatController = require("../controllers/chat.controller");



router.post("/register", async (req, res) => {
    try {
        console.log(req.body);
        const {email, password} = req.body;
        await userController.register({email, password});
    
        const responseData = { message: "Request received successfully" };

        res.status(200).json(responseData);// 응답 보내기
    } catch(error) {
        console.error("Error:", error);
        res.status(500).json({error: "Error occurred while processing request"}); // 오류 응답 보내기  //그냥 .send로 전송시, html로 통신함. 
    }
});

router.post("/login", async (req, res) => {
    try{
        const {email, password} = req.body;
        await userController.login({email, password});

        const responseData = { message: "Request received successfully" };
        res.status(200).json(responseData);// 응답 보내기
    }catch(error){
        console.error("Error:", error);
        res.status(500).json({error: "Error occurred while processing request"}); // 오류 응답 보내기  //그냥 .send로 전송시, html로 통신함. 
    }
});



module.exports = router;
const userController = require("../controllers/user.controller");
const chatController = require("../controllers/chat.controller");
const roomController = require("../controllers/room.controller");
const express = require("express");

module.exports = function(io){
    io.on("connection", async(socket) => {
        const sid = socket.id;

        socket.emit("rooms", await roomController.getAllRooms());
        
        console.log("client is connected", sid);
        
        socket.on("login", async ({ email, password, sid }, callback) => {
            console.log("socket login parameters =", email, password, sid);
            try {
                const loginCheck = await userController.checkUser(email);
                
                if (loginCheck) {
                    const user = await userController.login({ email, password, sid });  // 수정: {email, password, sid} 객체 전달
                    callback({ ok: true, data: user });
                } else {
                    throw new Error("Email has not been found");
                }
            } catch (error) {
                callback({ ok: false, error: error.message });
            }
        }); 
        

        socket.on("sendMessage", async(message, callback) => {

            try{
                const user = await userController.checkSocketUser(sid);  //유저 찾기 socket id로
                const newMessage = await chatController.saveChat(message, user); //메세지 저장(유저);
                
                io.emit("message", newMessage); //callback({ok: true, data: newMessage});
                callback({ok:true});

            }catch(error){
                callback({ok:false, error: error.message});
            }
        });

        
        socket.on("joinRoom", async(rid, callback) => {
            console.log(rid, callback, sid);

            try{
                const user = await userController.checkSocketUser(sid);    // 유저 정보 들고 오기
                console.log("check joinRoom user =", user, user.email);
                await roomController.joinRoom(rid, user);   // 1~2 작업
                socket.join(user.room.toString());  //3 작업

                const welcomeMessage = {
                    chat: `${user.name} is joined to this room`,
                    user: {id: null, name: "system"},
                };

                io.to(user.room.toString()).emit("message", welcomeMessage); // 4 작업
                io.emit("rooms", await roomController.getAllRooms()); // 5 작업

                callback({ok:true});
            }catch(error){
                callback({ok:false, error: error.message});   
            }
        });

        socket.on("disconnect", () => {
            console.log("user is disconnected.");
        });


  // 에러가 있어서 잠시 주석 처리
        socket.on("leaveRoom", async(_, callback) => {
            try{
                const user = await userController.checkUser(sid);
                await roomController.leaveRoom(roomId, userId);
                const leaveMessage = {
                    chat: `${user.name} left this room`,
                    user: { id: null, name: "system"},
                };

                socket.broadcast.to(user.room.toString()).emit("message", leaveMessage);    //socket.broadcast의 경우 io.to()와 달리,나를 제외한 채팅방에 모든 맴버에게 메세지를 보낸다 
                io.emit("rooms", await roomController.getAllRooms());
                socket.leave(user.room.toString()); 

                callback({ok: true});
            }catch(error){
                callback({ok: false, error: error.message});
            }
        });

        socket.on("disconnect", () => {
            console.log("user is disconnected.");
        });
    });
};
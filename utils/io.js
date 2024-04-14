const userController = require("../controllers/user.controller");
const roomController = require("../controllers/room.controller");
const chatController = require("../controllers/chat.controller");

module.exports = function(io){
    io.on("connection", async(socket) => {
        socket.emit("rooms", await roomController.getAllRooms());

        console.log("client is connected", socket.id);

        socket.on("login", async(userName, callback) => {
            //유저 정보를 저장 
            try{
                const user = await userController.saveUser(userName, socket.id);
                callback({ok: true, data: user});
            }catch(error){
                callback({ok: false, error: error.message});
            }
            //console.log("backend", userName);
        });

        socket.on("sendMessage", async(message, callback) => {
            try{
                const user = await userController.checkUser(socket.id);  //유저 찾기 socket id로
                const newMessage = await chatController.saveChat(message, user); //메세지 저장(유저);

                io.emit("message", newMessage); //callback({ok: true, data: newMessage});
                callback({ok:true});

            }catch(error){
                callback({ok:false, error: error.message});
            }
        });

        socket.on("joinRoom", async(rid, callback) => {
            try{
                const user = await userController.checkUser(socket.id);    // 유저 정보 들고 오기

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

        socket.on("leaveRoom", async(_, callback)=>{
            try{
                const user = await userController.checkUser(socket.id);
                await roomController.leaveRoom(user);
                const leaveMessage = {
                    chat: `${user.name} left this room`,
                    user: { id: null, name: "system" },
                };
                socket.broadcast.to(user.room.toString()).emit("message", leaveMessage);    //socket.broadcast의 경우 io.to()와 달리,나를 제외한 채팅방에 모든 맴버에게 메세지를 보낸다 
                io.emit("rooms", await roomController.getAllRooms());
                socket.leave(user.room.toString()); //join 했던 방을 떠남
                callback({ok: true});
            }catch(error){
                callback({ok: false, message: error.message});
            }
        });
    });
};
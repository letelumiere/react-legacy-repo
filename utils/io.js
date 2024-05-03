const userController = require("../controllers/user.controller");
const chatController = require("../controllers/chat.controller");
const roomController = require("../controllers/room.controller");

module.exports = function(io){
    io.on("connection", async(socket) => {
        socket.emit("rooms", await roomController.getAllRooms());

        console.log("client is connected", socket.id);

        socket.on("login", async ({ email, password }, callback) => {
            try {
                const loginCheck = await userController.checkUser(email);
        
                if (loginCheck) {
                    const user = await userController.login(email, password);
                    callback({ ok: true, data: user });
                } else {
                    throw new Error("Email has not been found");
                }
            } catch (error) {
                callback({ ok: false, error: error.message });
            }
        });

        socket.on("register", async ({ email, password }, callback) => {
            try {
                const existingUser = await userController.checkUser(email);
                if (existingUser) {
                    throw new Error("User already exists");
                }
                const newUser = await userController.saveUser(email, password);
                callback({ ok: true, data: newUser });
            } catch (error) {
                callback({ ok: false, error: error.message });
            }
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

        socket.on("leaveRoom", async({roomId, userId}, callback) => {
            try{
                const user = await userController.checkUser(socket.id);
                await roomController.leaveRoom(roomId, userId);
                const leaveMessage = {
                    chat: `${user.name} left this room`,
                    user: { id: null, name: "system"},
                };

                socket.broadcast.to(user.room.toString()).emit("message", leaveMessage);    //socket.broadcast의 경우 io.to()와 달리,나를 제외한 채팅방에 모든 맴버에게 메세지를 보낸다 
                io.emit("rooms", await roomController.getAllRooms());
                socket.leave(user.room.toString()); 
                callback({ok: true});
            }catch{
                callback({ok: false, error: error.message});
            }
        });

        socket.on("disconnect", () => {
            console.log("user is disconnected.");
        });
    });
};

const Chat = require("../models/chat");
const chatController = {};

chatController.saveChat = async(message, user) => {
    const newMessage = new Chat({
        chat: message,
        user:{
            id: user._id,
            name: user.name,
        },
        room: user.room, 
    });
    await newMessage.save();

    return newMessage;
    
};

chatController.removeChat = async(room, user) => {
    
};

module.exports = chatController;
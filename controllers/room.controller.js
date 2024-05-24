const Room = require("../models/room");
const User = require("../models/user");
const roomController = {};

roomController.getAllRooms = async() => {
    try{
        const rooms = await Room.find({});
        return rooms;
    }catch(error){
        return res.status(500).json({ error: 'Failed to get rooms' });
    }
}

roomController.getJoinedRooms = async(userEmail) => {
    try{
        const rooms = await Room.find({members: {email : userEmail}});
        return rooms;
    }catch(error){
        return res.status(500).json({ error: 'failed to get joined rooms'});
    }
}

roomController.joinRoom = async(rid, user) => {
    const room = await Room.findById(rid);

    if(!room){
        throw new Error("해당 방이 없습니다.");
    }

    if(!room.members.includes(user._id)){
        room.members.push(user._id);
        await room.save();
    }

    user.room = rid;
    await user.save();
};

roomController.leaveRoom = async(user) => {
    const room = await Room.findById(user.room);
    if(!room){
        throw new Error("Room not found.");
    }

    room.members.remove(user._id);
    await room.save();
};


module.exports = roomController;


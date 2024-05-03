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

roomController.joinRoom = async (userIdA, userIdB) => {
    try {
        const roomData = new Room({
            members: [userIdA, userIdB],
        });
        
        // 인스턴스 저장
        const savedRoom = await roomData.save();

        if (!savedRoom) {
            throw new Error("Failed to create room.");
        }

        console.log('Room created successfully');
    } catch (error) {
        console.error('Error joining room:', error);
        if (next) {
            next(error);
        }
    }
}

roomController.leaveRoom = async (roomId, userId) => {
    try {
        const room = await Room.findById(roomId);
        
        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }

        // 사용자의 상태 변경
        const updatedUser = await User.findByIdAndUpdate(userId, { isWaiting: false, roomStatus: {}}, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        // 인스턴스 멤버 수 확인
        if (room.members.length === 0) {
            await Room.findByIdAndDelete(roomId);
            return res.status(200).json({ message: 'Room deleted successfully' });
        } else {
            return res.status(200).json({ message: 'User left the room' });
        }
    } catch (error) {
        console.error("Error leaving room:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = roomController;


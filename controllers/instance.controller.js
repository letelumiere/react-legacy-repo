const Instance = require("../models/instance");
const User = require("../models/user");
const instanceController = {};

instanceController.joinInstance = async (userIdA, userIdB, next) => {
    try {
        const instanceData = new Instance({
            members: [userIdA, userIdB],
        });
        
        // 인스턴스 저장
        const savedInstance = await instanceData.save();

        if (!savedInstance) {
            throw new Error("Failed to create instance.");
        }

        console.log('Instance created successfully');
    } catch (error) {
        console.error('Error joining instance:', error);
        if (next) {
            next(error);
        }
    }
}

instanceController.createInstance = async (req, res, next) => {
    try {
        const { instanceId, members } = req.body;
        const newInstance = new Instance({
            title: instanceId,
            members: members,
        });

        // 채팅 방 저장
        const savedInstance = await newInstance.save();

        if (!savedInstance) {
            throw new Error("Failed to create chat room.");
        }

        // 응답에 생성된 채팅 방 반환
        res.status(201).json({ message: 'Chat room created successfully', instance: savedInstance });
    } catch (error) {
        console.error('Error creating chat room:', error);
        res.status(500).json({ error: 'Internal Server Error' });
        if (next) {
            next(error);
        }
    }
}

instanceController.leaveInstance = async (instanceId, userId, next) => {
    try {
        const instance = await Instance.findById(instanceId);
        
        if (!instance) {
            throw new Error("Instance data not found.");
        }

        // 사용자의 상태 변경
        await User.findByIdAndUpdate(userId, { isWaiting: false }, { new: true });

        // 인스턴스 멤버 수 확인 및 인스턴스 삭제
        if (instance.members.length === 0) {
            await Instance.findByIdAndDelete(instanceId);
        }

    } catch (error) {
        console.error("Error leaving instance:", error);
        if (next) {
            next(error);
        }
        throw error;
    }
};


module.exports = instanceController;
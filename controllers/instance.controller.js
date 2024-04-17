const Instance = require("../models/instance");
const User = require("../models/user");
const instanceController = {};

instanceController.joinInstance = async (userIdA, userIdB) => {
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


instanceController.createInstance = async (req, res) => {
    try {
        const { instanceId, members } = req.body;

        // 입력 유효성 검사
        if (!instanceId || !members || !Array.isArray(members)) {
            return res.status(400).json({ error: 'Invalid input data' });
        }

        const newInstance = new Instance({
            title: instanceId,
            members: members,
        });

        // 채팅 방 저장
        const savedInstance = await newInstance.save();

        // 인스턴스 생성 실패 시 에러 응답
        if (!savedInstance) {
            return res.status(500).json({ error: 'Failed to create chat room' });
        }

        // 응답에 생성된 채팅 방 반환
        res.status(201).json({ message: 'Chat room created successfully', instance: savedInstance });
    } catch (error) {
        console.error('Error creating chat room:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

instanceController.leaveInstance = async (instanceId, userId) => {
    try {
        const instance = await Instance.findById(instanceId);
        
        if (!instance) {
            return res.status(404).json({ error: 'Instance not found' });
        }

        // 사용자의 상태 변경
        const updatedUser = await User.findByIdAndUpdate(userId, { isWaiting: false, instanceStatus: {}}, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        // 인스턴스 멤버 수 확인
        if (instance.members.length === 0) {
            await Instance.findByIdAndDelete(instanceId);
            return res.status(200).json({ message: 'Instance deleted successfully' });
        } else {
            return res.status(200).json({ message: 'User left the instance' });
        }
    } catch (error) {
        console.error("Error leaving instance:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

instanceController.createTest = async (req, res) =>{
    try{
        const instances = await Instance.insertMany([
            {title : "testInstance", members : [],}]
        );

        res.send(instances);    
    } catch (error) {
        console.error("error while creating rooms:", error);
        res.status(500).send("error while creating rooms"); // 오류 발생 시 클라이언트에게 500 에러 응답
    }
};


module.exports = instanceController;
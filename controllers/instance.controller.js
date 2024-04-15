const Instance = require("../models/instance");
const User = require("../models/user");
const instanceController = {};


instanceController.joinInstance = async (userA, userB, next) => {
    try {
        const instanceData = new Instance({members: [userA, userB],});

        await instanceData.save();

        console.log('Instance created successfully');
    } catch (error) {
        console.error('Error joining instance:', error);
    }
}


instanceController.createInstance = async (req, res, next) => {
    try{
        const { instanceId, members } = req.body;
        const newInstance = await Instance({
            title : instanceId,
            members : members
        });

        await newInstance.save();
        res.status(201).json({ message: 'Chat room created successfully', chatRoom });
    }catch{
        console.error('Error creating chat room:', error);
        res.status(500).json({ error: 'Internal Server Error' });    
    }
}

instanceController.leaveInstance = async(instanceId, user, next) => {
    const data = await Instance.findById(title.instanceId);

    if(!data){
        throw new Error("instance data not found.");
    }else{
        await User.findByIdAndUpdate(user.token, {isWaiting: false}, {new : true});
    }    
};


module.exports = instanceController;
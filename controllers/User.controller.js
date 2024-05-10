const User = require("../models/user");
const userController = {};


userController.checkUser = async (userName) => {
    let user = "";

    try{
        user = await User.findOne({name : "username"});
    } catch (error) {
        console.error("Error saving user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
    return user === userName ? true : false;
};

userController.login = async({email, password}) => {
    try{
        const user = await User.findOne({email : "email", password : "password"});

        if(user){
            await User.findOneAndUpdate({email : "email"}, {online : true});
        }

    }catch(error){
        console.error("login error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

userController.withdraw = async() => {

};

userController.register = async({email, password}) => {
    console.log(email);
    console.log(password);
    try {
        const existingUser = await userController.checkUser(email);
        console.log(existingUser);
        if (existingUser) {
            throw new Error("User already exists");
        }
        const newUser = await userController.saveUser(email, password);
        callback({ ok: true, data: newUser });
    } catch (error) {
        callback({ ok: false, error: error.message });
    }

}


userController.saveUser = async (userName, email, sid) => {    
    try {
            user = new User({
                name: userName,
                email : email,
                token: sid,
                online: true,
                instanceStatus: false,
                isWaiting: false,
            });
            

        // 이미 있는 유저라면 연결 정보 token 값만 업데이트
        user.token = sid;
        user.online = true;

        await user.save();
        
        // 저장된 사용자 객체 반환
        return user;
    } catch (error) {
        console.error("Error saving user:", error);
        // 에러가 발생하면 500 상태 코드와 함께 에러 메세지 반환
        res.status(500).json({ error: "Internal Server Error" });
    }
};


userController.readyStatus = async (sid) => {
    try{
        let userData = await User.findOne({token: data.token});
        
        if (userData.token === sid) {
            // 대기 상태를 변경합니다.
            if (userData.isWaiting) {
                userData.isWaiting = false; // 대기 중인 경우, 대기 상태를 해제합니다.
            } else {
                userData.isWaiting = true; // 대기 중이 아닌 경우, 대기 상태로 변경합니다.
            }
            // 변경된 사용자 정보를 데이터베이스에 저장합니다.
            await userData.save();
            // 클라이언트에 응답을 보냅니다.
            res.status(200).json({ message: 'User status changed successfully', userData });
        } else {
            // 토큰에 해당하는 사용자가 없는 경우 에러를 응답합니다.
            res.status(404).json({ error: 'User not found' });
        }
    }catch(error){
        res.status(500).json({error: "Internal Server Error."});
    }    

};

userController.startMatching = async (req, res) => {
    try {
        const data = req.body;
        let userData = await User.findOne({ token: data.token });

        if (userData) {
            userData.isWaiting = true;
            userData.instanceStatus = {};

            await userData.save();
            res.status(200).json({ message: "Matching started successfully." });
        } else {
            res.status(404).json({ error: "User not found." });
        }
    } catch (error) {
        console.error("Error starting matching:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

userController.stopMatching = async (req, res) =>{
    try{
        let user = await User.findOne({token: sid});
        user.isWaiting = false;
        
        await user.save();
    }catch{
        console.error("stop matching Error", error);
        res.status(500).json({error : "Internal Server error"});
    }
};

userController.findOther = async (req, res) => {
    try{
        const { sid } = req.body;
        const otherUser = await User.aggregate([
            { $match: { sid: {$ne: sid}, isWaiting: true}},
            { $sample: {size: 1}},
        ]);
    
        if(!otherUser || otherUser==0){
            return res.status(404).json({message: "no other users available"});
        }       
    }catch{
        return res.status(404).json({ error: 'User not found.' });
    }
};

userController.findAllUsers = async (req, res) => {
    try{
        const count = await User.countDocuments({online: true});

        return res.status(200).json({message : `${count} users are now.`});
    }catch{
        console.error("Error finding online users:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = userController;

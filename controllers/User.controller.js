const User = require("../models/user");
const userController = {};


userController.checkUser = async (email) => {
    try {
        const user = await User.findOne({ email: email });
        // user가 null이면 false 반환, user가 존재하면 true 반환
        return user !== null;
    } catch (error) {
        console.error("Error checking user:", error);
        // 오류 발생 시 false 반환 (또는 필요에 따라 다른 방식으로 처리)
        return false;
    }
};

userController.checkSocketUser = async (sid) => {
    try {
        const user = await User.findOne({ token: sid });
        // user가 null이면 false 반환, user가 존재하면 true 반환
        console.log("socketUser = " , user);
        return user;
    } catch (error) {
        console.error("Error checking user:", error);
        // 오류 발생 시 false 반환 (또는 필요에 따라 다른 방식으로 처리)
        return false;
    }
};

userController.login = async({email, password, sid}) => {  // 변경: userEmail -> email
    try {
        const user = await User.findOne({email: email, password: password});
        if(user) {
            await User.findOneAndUpdate({email: email}, {token: sid, online: true});
            return user;  // 성공적으로 로그인한 사용자 정보를 반환
        } else {
            throw new Error("email is not exists or password invalid!");
        }
    } catch(error) {
        console.error("login error:", error);
        throw new Error("Internal Server Error");  // 오류를 상위로 던짐
    }
};


userController.withdraw = async() => {

};

userController.register = async ({ email, password, sid }) => {
    console.log("email from register request = ", email);
    try {
        const existingUser = await userController.checkUser(email);
        if (existingUser) {
            throw new Error("User already exists");
        }
        const newUser = await userController.saveUser(email, password, sid);
        return newUser; // 새로 생성된 사용자 정보 반환
    } catch (error) {
        throw error; // 에러 발생시 호출된 곳으로 에러 전파
    }
};


userController.saveUser = async (email, password, sid) => {    
    try {
            const user = new User({
                name: email,
                email : email,
                password : password,
                token: sid, 
                online: false,
                instanceStatus: false,
                isWaiting: false,
            });
            
        await user.save();
        
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

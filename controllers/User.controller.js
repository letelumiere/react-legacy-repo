const User = require("../models/user");
const userController = {};

userController.saveUser = async(userName, sid) => {
    //이미 있는 유저 여부 확인
    let user = await User.findOne({ name : userName });
    //없다면 새로 유저 정보 만들기
    if(!user){
        user = new User({
            name: userName,
            token: sid,
            online: true,
        });
    }
    //이미 있는 유저라면 연결 정보 token 값만
    user.token = sid;
    user.online = true;

    await user.save();  
    return user;
};

userController.checkUser = async(sid) => {
    const user = await User.findOne({token: sid});
    if(!user){
        throw new Error("user not found!");
    }else{
        return user;
    } 
};

userController.checkUser = async(sid, next) => {
    const user = await User.findOne({token: sid});
    if(!user){
        throw new Error("user not found!");
    }else{
        return user;
    } 
};

userController.checkUser = async (req, res, next) => { //try~ catch문은 현재 생략됨
    const { sid } = req.body;
    const otherUser = await User.aggregate([
        { $match: { sid: {$ne: sid}, isWaiting: true}},
        { $sample: {size: 1}},
    ]);

    if(!otherUser || otherUser==0){
        return res.status(404).json({message: "no other users available"});
    }
    next();
}

userController.changeStatus = async (req, res, next) => {
    const data = req.body;
    let userData = await User.findOne({token: data.token});

    if (userData) {
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
};

userController.stopMatching = async (req, res) =>{
    let user = await User.findOne({token: sid});
    user.isWaiting = false;
    
    await user.save();
}



module.exports = userController;

/*
const data = await Instance.aggregate([
    { 
        $match: { $expr: { $eq: [{ $size: "$members" }, 0] }} // items 배열의 길이가 1인 것을 검색
    }
]);
*/

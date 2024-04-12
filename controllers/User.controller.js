const User = require("../models/Chat");
const userController = require("../controllers/User.controlller");

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

module.exports = userController;
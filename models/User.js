const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name : {String,
        type: String,
        require : [true, "user must type name"],
        unique : true,
    },
    token: {
        type: String,
    },
    online: {
        type: Boolean,
        default: false,
    },
    room: {
        type: mongoose.Schema.ObjectId,
        ref: "Room",
    },
});


module.exports = mongoose.model("user", userSchema);
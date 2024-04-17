const mongoose = require("mongoose");   //<-"express를  가져와서 안됐었다"

const chatSchema = new mongoose.Schema(
    {
        chat: String,
        user: {
            id: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
            },
            name: String
        },
        instance: {
            type: mongoose.Schema.ObjectId,
            ref: "Instance",
        },
    },
    { timestamps : true }
);

module.exports = mongoose.model("chat", chatSchema);


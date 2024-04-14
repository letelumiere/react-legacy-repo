const mongoose = require("mongoose");

const instanceSchema = new mongoose.Schema(
    {
        title: String,
        members :[{
            type: mongoose.Schema.ObjectId,
            ref: "User",
        }],
    },
    {timestamps: true},
);


module.exports = mongoose.model("instance", instanceSchema);
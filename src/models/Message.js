const mongoose = require("mongoose");


const messageSchema = new mongoose.Schema({
    senderId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    senderName:{
        type:String,
        required:true
    },
    content:{
        type: String,
        default:""
    }
});

module.exports = mongoose.model("Message", messageSchema);
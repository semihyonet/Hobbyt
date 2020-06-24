const mongoose = require("mongoose");


const hobbySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    }
});

module.exports = mongoose.model("Hobby", hobbySchema);
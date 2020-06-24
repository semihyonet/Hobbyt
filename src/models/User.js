const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const friendSchema = new mongoose.Schema(
    {
        username: {
            type:String,
            required:true
        },
        relationship: {
            type:String,
            required:true,
        }
    }
)

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    hobbies:{
        type:[String],
        required:true,
    },
    age:{
        type:Number,
    },
    friends:{
        type:[friendSchema],
        required:true,
    }
});

//This is a very important function which starts before save function runs. It encrypts the password with the salt using the bcrypt module. 
userSchema.pre('save', function(next) {
    const user = this;
    if (!user.isModified('password')) {
      return next();
    }
  
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return next(err);
      }
  
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  });
//Comparisons are done automaticaly without using a global variable as a salt.
userSchema.methods.comparePassword = function(candidatePassword) {
    const user = this;
  
    return new Promise((resolve, reject) => {
      bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
        if (err) {
            console.log("Error happend")
          return reject(err);
        }
  
        if (!isMatch) {
            console.log("Not a match")
          return reject(false);
        }
  
        resolve(true);
      });
    });
  };
  
module.exports = mongoose.model("User", userSchema);
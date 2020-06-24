const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = mongoose.model('User');
const Hobby = mongoose.model('Hobby');

const router = express.Router();

router.post('/signup',async (req,res) => 
{
    try{
    const {username,password,email,hobbies,age,friends} = req.body;

    const user = new User({username,password,email,hobbies,age,friends});

    hobbies.map(async (hobby) => 
    {
        
        const aHobby = await Hobby.findOne({name:hobby})
        if (!aHobby)
        {
            const newHobby = new Hobby({name:hobby});
            newHobby.save();
            console.log("New Hobby initilized!");
        }
    })

    await user.save();
    const token = jwt.sign({userId:user._id}, TOKEN_KEY);
    res.send({token})
    }
    catch(err){
        return res.status(422).send(err.message);
    }
 
    console.log("Success")
})

router.post('/signin',async (req,res) => 
{
    const {username, password} = req.body;

    if (!username || !password){
        return res.status(422).send({ error: 'Must provide email and password' });
      }

      const user = await User.findOne({ username });
      if (!user) {
        return res.status(422).send({ error: 'Invalid password or email' });
      }
    try {
        await user.comparePassword(password);
        const token = jwt.sign({ userId: user._id }, TOKEN_KEY);
        res.send({ token });
        //user.hobbies = ["Kayak"];
        //await user.save();
    } catch (err) {
        return res.status(422).send({ error: 'Invalid password' });
    }
})


module.exports = router;
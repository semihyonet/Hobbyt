const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');

const Hobby = mongoose.model('Hobby');
const User = mongoose.model('User');

const router = express.Router();


router.get('/hobbies', async (req, res) => {
    await Hobby.find({}, function(err, hobbies) {
        res.send(hobbies);
      });
});


router.get('/hobbies/:hobby', async (req, res) => {
    await User.find(
        {
            hobbies:req.params.hobby
        },
        (err, users) => 
        {
			let names = [];
			users.map((user) => 
			{
				names.push(user.username);
			})
			res.send(names)
		
        }
    )

});


module.exports = router;
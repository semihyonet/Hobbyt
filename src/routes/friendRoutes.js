const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');

const User = mongoose.model('User');

const router = express.Router();

function unfriender(arr,friendId) 
{
    let newFriends = []
    for (let i = 0; i < arr.length ; i++)
    {
        if ((`${arr[i].username}` == `${friendId}` ) == false )
        {
            
            newFriends.push(arr[i])
        }
        else 
        {
            console.log("repetition")
        }
    }
    
    return newFriends;
}



router.use(requireAuth);

router.get('/friends', async (req, res) => {
    try{
    await User.findOne({ _id: req.user._id }, function(err,user)
    {
        res.send(user.friends);
    });
    }
    catch{
        
        res.status(422).send({ error: err.message });
        
    }
});
    

router.post('/friends', async (req, res) => {
  const { username, relationship } = req.body;

  if (!username || !relationship) {
    return res
      .status(422)
      .send({ error: 'You must provide a name and password' });
  }

    try {
        const frienduser = User.findOne({username:username},async function(err,obj)
        {
            try{
                let userId = req.user.username;
                let friendId = obj.username;

                if (obj.friends.length > 0)
                {
                    obj.friends =unfriender(obj.friends,userId );
                }
                if (req.user.friends.length > 0)
                {
                    req.user.friends =unfriender(req.user.friends,friendId );
                }
            obj.friends = [...obj.friends,
                {
                    username:req.user.username,
                    relationship:relationship
                }];

            req.user.friends = [...req.user.friends,
                {
                    username:friendId,
                    relationship:relationship
                }];
            await obj.save();
            await req.user.save();
            res.send("Done");

        }
            catch (err) 
            {
                res.status(422).send({ error: err.message });
            }
        });
        
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

module.exports = router;
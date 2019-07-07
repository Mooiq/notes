// @Login & register

const express = require("express");
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcrypt');


// $router  GET api/users/test
// @desc    返回请求数据
// @access  public
router.get("/test",(req, res) => {
    res.json({meg:"login works"});
})

// $router  POST api/users/register
// @desc    返回请求数据
// @access  public
router.post("/register",(req, res) => {
    // console.log(req.body); 

    // 查看数据库中是否拥有该邮箱
    User.findOne({email: req.body.email})
        .then(user => {
            if(user){
                return res.status(400).json({email: "改邮箱已被注册！"})
            } else {
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password
                });

                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        // Store hash in your password DB.
                        if(err) throw err;

                        newUser.password = hash;

                        //sava
                        newUser.save()
                               .then(user => res.json(user))
                               .catch(err => console.log(err));
                    });
                });
            }
        })
})

module.exports = router;
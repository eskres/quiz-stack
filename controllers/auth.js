// Require User Model
const User = require("../models/User");

// Require bcrypt for hashing
const bcrypt = require('bcrypt');
const salt = 10;

// Require jsonwebtoken
const jwt = require("jsonwebtoken")

exports.auth_signup_post = (req, res) => {
    let user = new User(req.body);
    let hash = bcrypt.hashSync(req.body.password, salt);
    user.password = hash;
    user.save()
    .then(()=> {
        res.json({"message": "User created successfully"})
    })
    .catch((err)=> {
        console.log(err);
        res.json({"message":"Error creating user, please try again later"})
    })
}

exports.auth_signin_post = async(req, res) => {
    let {emailAddress, password} = req.body;
    try{
        let user = await User.findOne({emailAddress});

        if(!user)
        {return res.json({ "message": "Account not found"}).status(400)}

        const isMatch = await bcrypt.compareSync(password, user.password);

        if(!isMatch){
            return res.json({"message": "Password incorrect"}).status(400)
        }

        const payload = {
            user:{
                id: user._id,
            }
        }

        jwt.sign(
            payload,
            process.env.SECRET,
            { expiresIn: "20h"},
            (err, token) => {
                if(err) throw err;
                res.json({token}).status(200);
            }
        )
    }
    catch(error){
        console.log(error)
        res.json({"message": "Sign in failed"}).status(400);
    }
}
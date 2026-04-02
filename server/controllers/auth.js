// Require User Model
const {User} = require("../models/User");

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
        {return res.status(400).json({ "message": "Account not found"})}

        const isMatch = await bcrypt.compareSync(password, user.password);

        if(!isMatch){
            return res.status(400).json({"message": "Password incorrect"})
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
                res.status(200).json({token});
            }
        )
    }
    catch(error){
        console.log(error)
        res.status(400).json({"message": "Sign in failed"});
    }
}

exports.auth_show_get = (req, res) => {
    User.findById(req.query.id)
    .then(user => {
        res.json({user})
    })
    .catch(err => {
        console.log(err)
    })
}
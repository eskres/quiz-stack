const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {

    let token = ""
    let authorizationToken = req.header("Authorization");
    console.log(authorizationToken);

    if(!authorizationToken){
        return res.json({"message": "Access denied"})
    }

    if(authorizationToken){
        authorizationToken = authorizationToken.replace("Bearer ", "");
        console.log(authorizationToken);
        token = authorizationToken
    }

    try{
        const decodedToken = jwt.verify(token, process.env.SECRET);

        req.user = decodedToken.user;
        next();
    }
    catch(error){
        return res.json({"message": "Authorization token invalid"})
    }

}
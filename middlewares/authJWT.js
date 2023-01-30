const jwt = require("jsonwebtoken");
const authConfig = require('../configs/auth.config');
const User = require("../models/user.model")
const constants = require("../utils/constants");

verifyToken = (req, res, next)=>{
    let token = req.headers['x-access-token'];
    
    if(!token){
        return res.status(403).send({msg: 'No token provided'});
    }
    jwt.verify(token,authConfig.secret,(err,decoded)=>{
        if(err){
            return res.status(401).send({msg:Unauthenticated});
        }
        req.userId = decoded.id;
        next();
    })
}

isAdmin = async (req,res,next) => {
    const user  = await User.findOne({userId:req.userId});
    if(user && user.userTypes === constants.userTypes.admin){
        next(); 
    }else{
        return res.status(403).send({msg:"require admin role"})
    }
}

module.exports={
    verifyToken,
    isAdmin
}
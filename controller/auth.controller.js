const bcrypt = require('bcrypt')
const User = require('../models/user.model')
const constants = require('../utils/constants')
const jwt = require('jsonwebtoken');
const config = require('../configs/auth.config');

exports.signup = async (req, res) => {
    var userStatus;
    if(!req.body.userType || req.body.userType==constants.userStatus.approved){
        userStatus = constants.userStatus.approved;
    }else{
        userStatus = constants.userStatus.pending;
    }
    const userObject = {
        name:req.body.name,
        userId:req.body.userId,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password,8),
        userStatus:userStatus,
        userTypes:req.body.userTypes,
        createdAt:User.createdAt
    }

    try {
        const user = await User.create(userObject);
        res.status(201).send(user);
    } catch (error) {
        res.status(500).send({msg:"Internal Server error:"+err.message});
    }
}

exports.signin = async (req, res) => {
    const {userId,password} = req.body;
    //verify wether the userId is correct or not

    const user = await User.findOne({userId});
    
    if(!user){
        res.status(400).send({msg:"UserId doesn't exist"});
        return;
    }
    if(user.userStatus!==constants.userStatus.approved){
        res.status(403).send({msg:'only Approved users are allowed to login'})
        return;
    }
    var isCorrectPassword = bcrypt.compareSync(req.body.password, user.password);

    if(!isCorrectPassword){
        res.status(401).send({msg:"invalid password"})
    }
    const token  = jwt.sign({id:user.userId},config.secret,{
        expiresIn:'1h'
    });
    res.status(200).send({
        name:user.name,
        userId:user.userId,
        email:user.email,
        userTypes:user.userTypes,
        userStatus:user.userStatus,
        accessToken:token
    })
}



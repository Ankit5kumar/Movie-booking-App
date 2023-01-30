const User  = require('../models/user.model');
const constants = require('../utils/constants');

validateUserReqBody = async (req, res, next) => {
    // Check
    if(!req.body.name){
        return res.status(400).send({msg:"Failed! name is not provided"})
    }
    if(!req.body.userId){
        return res.status(400).send({msg:"Failed! userId is not provided"})
    }
    
    const user = await User.findOne({userId:req.body.userId});
    if(user!=null){
        return res.status(400).send({msg:"Failed userId already exist"})
    }
    //validate email
    if(!req.body.email){
        return res.status(400).send({msg:"Failed email is not provided"})
    }
    const email = await User.findOne({email:req.body.email});

    if(email!=null){
        return res.status(400).send({msg:"Failed mail already exists"});
    }
     // validate userTypes
     const userTypes = [constants.userTypes.admin,constants.userTypes.customer,constants.userTypes.client];

     if(req.body.userType && !userTypes.includes(req.body.userType)){
         return res.status(400).send({msg:`Failed usertype should be among: ${userTypes}`})
     }
     next();

}
module.exports={
    validateUserReqBody
}
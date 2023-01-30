const User = require('../models/user.model')
const bcrypt = require('bcrypt');

exports.update = async (req, res) => {
    const userId = req.userId;

    if(!req.body.password){
        return res.status(400).send("password not passed");
    }
    try {
        const user = await User.findOneUpdate({
            userId: userId
        },{
            password: bcrypt.hashSync(req.body.password,10)
        });
        res.status(200).send({msg:"password update successfully"})
    } catch (error) {
        res.status(500).send({msg:"Some internal error occurred"})
    }
}
exports.updateUser = async (req,res)=>{
 const userId = req.params.userId;

 try {
    const user  = await User.findOneUpdate(
        {userId: userId},
        {userStatus:req.body.userStatus}
        )
        if(!user){
            return res.status(400).send({msg:"Invalid user Id"})
        }
        res.status(200).send({msg:"User updated successfully"})
 } catch (error) {
    res.status(500).send({msg:"Some internal error"})
 }
}
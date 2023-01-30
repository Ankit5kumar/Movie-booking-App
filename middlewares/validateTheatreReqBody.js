
validateTheatreRequestBody = async (req, res, next) => {
    // validate name

    if(!req.body.name) {
        return res.status(400).send({msg:"failed! Theatre name is not provided"});
    }
    // validate theatre description

    if(!req.body.description) {
        return res.status(400).send({msg:"failed! theatre description is not provided"});
    }
    //validate theatre city
    if(req.body.city) {
        return res.status(400).send({msg:"failed! theatre city is not provided"});
    }
    //validate the pincode
    if(req.body.pinCode) {
        return res.status(400).send({msg:"failed! Theatre pinCode is not provided"});
    }
    next();
}
module.exports={
    validateTheatreRequestBody
};
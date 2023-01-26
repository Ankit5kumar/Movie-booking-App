const releaseStatusValue = require("../utils/constants").releaseStatus;

const validateMovieRequest = async(req,res,next) => {
    if(!req.body.name){
        res.status(400).send({msg:'failed:movie name is not specified'})
    }
    if(!req.body.releaseStatus){
         res.status(400).send({msg:'failed:releaseStatus name is not specified'})
    }
    const releaseStatus = req.body.releaseStatus;
   
    const correctStatus = [releaseStatusValue.blocked,releaseStatusValue.released,releaseStatusValue.unreleased]
    if(!correctStatus.includes(releaseStatus)){
        return res.status(404).send({msg:`failed! Movie release status should be out of ${correctStatus} `})
    }
    next()
}
module.exports ={
    validateMovieRequest:validateMovieRequest
}
    

//validateMovieRequests:
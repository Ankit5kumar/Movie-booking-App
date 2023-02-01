const Theatre=require("../models/theatre.model")
const Movie = require("../models/movie.models")

const validateBooking = async (req,res,next) => {
 if(!req.body.theatreId){
    res.status(404).send({msg:"Failed theatre id is not porvided"})
 }
 const savedTheatre = await Theatre.findOne({_id:req.body.theatreId})
 if(!savedTheatre){
    res.status(404).send({msg:"Failed theatre is not invalid"})
 }
 if(!req.body.movieId){
    res.status(404).send({msg:"Failed movieId id is not porvided"})
 }
const savedmovie = await Movie.findOne({_id:req.body.movieId})

if(!savedmovie){
    res.status(404).send({msg:"Failed movieId is invalid"})
}
if(!savedTheatre.movies.includes(req.body.movieId)){
    return res.status(400).send({msg:"Failed! movie id is not available in the given theatre!"})
}
if(!req.body.timing){
    res.status(404).send({msg:"Failed timing id is not porvided"})
}
if(!req.body.noOfSeats){
    res.status(404).send({msg:"Failed noOfSeats id is not porvided"})
}
next();


}
module.exports = validateBooking
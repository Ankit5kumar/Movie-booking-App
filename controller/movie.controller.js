const Movie = require('../models/movie.models');
const theatreModel = require('../models/theatre.model');

exports.createMovie = async (req,res) => {
    const movie = await Movie.create(req.body);
    res.status(201).send(movie)
}

exports.getAllMovies = async (req, res) => {
    const query = {};
    if(req.query.name!=undefined){
        query.name=req.query.name
    }
    const movies = await Movie.find(query);
    res.status(200).send(movies);
}
exports.getMovie = async (req, res) => {
    const movie = await Movie.findOne({
        _id: req.params.id
    })
    res.status(200).send(movie);
}
exports.updateMovie = async (req, res) => {
    const id = req.params.id;
    const savedMovie = await Movie.findOne({_id:id})
    if(!savedMovie){
        res.status(400).send('movie to be updated does nt exisits')
    }


    savedMovie.name = req.body.name ? req.body.name : savedMovie.name;
    savedMovie.description = req.body.description ? req.body.description : savedMovie.description;
    savedMovie.casts = req.body.casts ? req.body.casts : savedMovie.casts;
    savedMovie.director = req.body.director ? req.body.director : savedMovie.director;
    savedMovie.trailerUrl = req.body.trailerUrl ? req.body.trailerUrl : savedMovie.trailerUrl;
    savedMovie.posterUrl = req.body.posterUrl ? req.body.posterUrl : savedMovie.posterUrl;
    savedMovie.language = req.body.language ? req.body.language : savedMovie.language;
    savedMovie.releaseDate = req.body.releaseDate ? req.body.releaseDate : savedMovie.releaseDate;
    savedMovie.releaseStatus = req.body.releaseStatus ? req.body.releaseStatus : savedMovie.releaseStatus;
    
    const updateMovie = await savedMovie.save();
    res.status(200).send(updateMovie);

}
exports.deleteMovie = async (req, res) => {
    const result  = await Movie.findByIdAndDelete({_id: req.params.id});
    res.status(200).send({msg:`sucessfull deleted movie with ${result}`})
}

exports.getTheatreForMovies = async (req,res)=>{
         // find the movieId
         const movie = req.params.movieId;
         // validate movieId
         const savedMovie = await Movie.findByIdAndUpdate({_id:movie});

         if(!savedMovie){
            res.status(400).send({msg:"Invalid Movie Id"});
         }

         // get all the movie
         const savedTheatres = await theatreModel.find({});

         const validTheatres = savedTheatres.filter(theatre=> theatre.movies.includes(movie))

         res.status(200).send(validTheatres);
}
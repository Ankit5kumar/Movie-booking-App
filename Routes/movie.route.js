const express = require('express')
const movieController = require('../controller/movie.controller');
const movieRequestValidator = require('../middlewares/validateMovie');
const Route = express.Router();
const {verifyToken,isAdmin} = require('../middlewares/authJWT');



    Route.post("/mba/api/v1/movies", [verifyToken,isAdmin,movieRequestValidator.validateMovieRequest], 
    movieController.createMovie)

    Route.get("/mba/api/v1/movies",[verifyToken],movieController.getAllMovies)

    Route.get("/mba/api/v1/movies/:id",[verifyToken],movieController.getMovie)

    Route.put("/mba/api/v1/movies/:id",[verifyToken,isAdmin],movieController.updateMovie)

    Route.delete("/mba/api/v1/movies/:id",[verifyToken,isAdmin],movieController.deleteMovie)
    Route.get("/mba/api/v1/movies/:movieId/theatres",[verifyToken],movieController.getTheatreForMovies)
module.exports = Route

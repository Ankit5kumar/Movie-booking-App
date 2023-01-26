const express = require('express')
const movieController = require('../controller/movie.controller');
const movieRequestValidator = require('../middlewares/validateMovie');
const Route = express.Router();



    Route.post("/mba/api/v1/movies", [movieRequestValidator.validateMovieRequest], 
    movieController.createMovie)

    Route.get("/mba/api/v1/movies",movieController.getAllMovies)

    Route.get("/mba/api/v1/movies/:id",movieController.getMovie)

    Route.put("/mba/api/v1/movies/:id",movieController.updateMovie)

    Route.delete("/mba/api/v1/movies/:id",movieController.deleteMovie)
module.exports = Route
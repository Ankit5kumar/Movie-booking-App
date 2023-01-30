const  express = require('express');
const theatreController = require('../controller/theatre.controller')
const route = express.Router();
route.post("/mba/api/v1/theatres", theatreController.createTheatre);
route.get("/mba/api/v1/theatres", theatreController.getAllTheatres);
route.get("/mba/api/v1/theatres/:id", theatreController.getTheatre);
route.put("/mba/api/v1/theatres/:id", theatreController.updateTheatre);
route.delete("/mba/api/v1/theatres/:id", theatreController.deleteTheatre);
route.put("/mba/api/v1/theatres/:theatreId/movies", theatreController.addMoviesToTheatre)
route.get("/mba/api/v1/theatres/:theatreId/movies/:movieId",theatreController.checkIfMovieRunningInTheatre);

module.exports = route;

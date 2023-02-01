const  express = require('express');
const theatreController = require('../controller/theatre.controller')
const route = express.Router();
const {verifyToken,isAdmin} = require('../middlewares/authJWT');
route.post("/mba/api/v1/theatres",[verifyToken,isAdmin], theatreController.createTheatre);
route.get("/mba/api/v1/theatres",[verifyToken], theatreController.getAllTheatres);
route.get("/mba/api/v1/theatres/:id",[verifyToken],theatreController.getTheatre);
route.put("/mba/api/v1/theatres/:id",[verifyToken,isAdmin], theatreController.updateTheatre);
route.delete("/mba/api/v1/theatres/:id",[verifyToken,isAdmin], theatreController.deleteTheatre);
route.put("/mba/api/v1/theatres/:theatreId/movies",[verifyToken,isAdmin], theatreController.addMoviesToTheatre)
route.get("/mba/api/v1/theatres/:theatreId/movies/:movieId",[verifyToken],theatreController.checkIfMovieRunningInTheatre);

module.exports = route;

const express = require('express');
const Route = express.Router();
const userController = require('../controller/User.controller')

const {verifyToken,isAdmin} = require("../middlewares/authJWT");
Route.put("/mba/api/v1/users",[verifyToken],userController.update)
Route.put("/mba/api/v1/users/:userId",[verifyToken,isAdmin],userController.updateUser)
module.exports = Route;

const express = require('express');
const Route = express.Router();
const authControllers = require("../controller/auth.controller")
const {validateUserReqBody} = require("../middlewares/validateUserReqBody");

Route.post("/mba/api/v1/auth/signup", [validateUserReqBody], authControllers.signup)
Route.post("/mba/api/v1/auth/signin",authControllers.signin);

module.exports = Route
const express = require('express');
const Route = express.Router();
const {verifyToken} = require('../middlewares/authJWT');
const validateBooking = require('../middlewares/validateBooking');
const bookingController = require('../controller/booking.controller');

Route.post("/mba/api/v1/bookings",[verifyToken, validateBooking],bookingController.createBooking)
Route.get("/mba/api/v1/bookings/:id",[verifyToken],bookingController.getBookingById)
Route.get("/mba/api/v1/bookings",[verifyToken],bookingController.getallBookings)

module.exports = Route
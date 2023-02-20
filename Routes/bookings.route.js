const express = require('express');
const Route = express.Router();
const {verifyToken,isAdmin} = require('../middlewares/authJWT');
const validateBooking = require('../middlewares/validateBooking');
const bookingController = require('../controller/booking.controller');

Route.post("/mba/api/v1/bookings",[verifyToken, validateBooking],bookingController.createBooking)
Route.get("/mba/api/v1/bookings/:id",[verifyToken],bookingController.getBookingById)
Route.get("/mba/api/v1/bookings",[verifyToken],bookingController.getallBookings)
Route.put("/mba/api/v1/bookings/:id",[verifyToken,isAdmin],bookingController.updateBooking)
Route.put("/mba/api/v1/bookings/:id/cancel",[verifyToken],bookingController.cancelBooking)



module.exports = Route
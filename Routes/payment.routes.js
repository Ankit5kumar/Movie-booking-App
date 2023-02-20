const express = require("express")
const Route = express.Router();
const {verifyToken} = require('../middlewares/authJWT');
const validatePaymentRequestBody = require("../middlewares/vallidatePayment");
const paymentController = require("../controller/payment.controller")

Route.post("/mba/api/v1/payments",[verifyToken, validatePaymentRequestBody],paymentController.createNewPayment)
Route.get("/mba/api/v1/payments",[verifyToken],paymentController.getAllPayments)
Route.get("/mba/api/v1/payments/:id",[verifyToken],paymentController.getPaymentById);

module.exports = Route;



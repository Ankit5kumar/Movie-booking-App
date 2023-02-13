const Booking = require('../models/booking.model')
const constants = require('../utils/constants')
const Payment = require('../models/payment.model')
const User = require('../models/user.model')

exports.createNewPayment = async (req,res) => {
    const savedBooking = await Booking.findOne({_id:req.body.bookingId})
    const bookingTime =  savedBooking.createdAt;
    const paymentTime = Date.now();

    const minutes = Math.floor(((paymentTime-bookingTime)/1000)/60)

    if(minutes>2){
        savedBooking.status = constants.bookingStatus.expired;
        return res.status(401).send({msg:"Can't do payment as booking is delayed and expired"})
    }
    const razorpayAPIResponse = {
        paymentStatus:constants.paymentStatus.success
    }

    var paymentObject = {
        bookingId:req.body.bookingId,
        amount:savedBooking.totalCost,
        status:razorpayAPIResponse.paymentStatus
    }

    try {
        const payment = await Payment.create(paymentObject);
        savedBooking.status = (paymentObject.status === constants.paymentStatus.success) ? constants.bookingStatus.completed : constants.bookingStatus.failed

        await savedBooking.save();
        return res.status(201).send(payment)
    } catch (error) {
        return res.status(201).send({msg:"inernal server error"});                                                                   
    }
}

exports.getAllPayments = async (req,res) => {
    const savedUser = await User.findOne({userId:req.userId});
    const queryObject = {};

    if(savedUser.userTypes === constants.userTypes.admin){

    }else{
        const bookings = await Booking.find({userId:savedUser._id});
        const bookingIds = bookings.map(booking=>booking._id);
        queryObject.bookingId = { $in:bookingIds };
    }
    const payments = await Payment.find(queryObject);
    return res.status(200).send(payments);
}
exports.getPaymentById = async (req,res)=>{
    const paymentId = req.params.id;

    const savedUser = await User.findOne({userId:req.userId});
    const savedPayment = await Payment.findOne({_id:paymentId});

    if(!savedPayment){
        return res.status(400).send({msg:"Invalid payment Id "})
    }
    if(savedUser.userTypes===constants.userTypes.admin){
    }else{ 
        const bookingId = savedPayment.bookingId;
        const savedBooking = await Booking.findOne({_id:bookingId});
        const userId = savedBooking.userId;

        if(!userId.equals(savedUser._id)){
            return res.status(403).send({msg:"Forbidden, paymentId is not associated with the loggedin user"})
        }
    }
    return res.status(200).send(savedPayment)

}
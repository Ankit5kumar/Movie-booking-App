const Booking = require("../models/booking.model")
const User = require("../models/user.model")
const constants =  require('../utils/constants')

exports.createBooking = async (req,res) => {
    const user  = await User.findOne({userId:req.userId})

    const bookingObj = {
        theatreId:req.body.theatreId,
        movieId:req.body.movieId,
        userId:user._id,
        timing:req.body.timing,
        noOfSeats:req.body.noOfSeats,
        totalCost:req.body.totalSeats*250
    }

    try {
        const booking = await Booking.create(bookingObj)
    res.status(200).send({msg:"booking done",booking})
    } catch (error) {
        res.status(500).send({msg:"internal server error", error:error.message})
    }
}
exports.getBookingById = async (req, res) => {
    try {
        const bookings = await Booking.findOne({_id:req.params.id});
        res.status(200).send(bookings);
    } catch (error) {
        res.status.send({msg:"internal server error"})
    }
}
exports.getallBookings = async (req,res)=>{
 const bookings = await Booking.find({});
 res.status(200).send({msg:"here's the bookings",bookings})
}

exports.updateBooking = async (req, res) => {
    const savedBooking = await Booking.findById({_id:req.params.id})
    if(!savedBooking){
        res.status(400).send({msg:"Invalid Id"})
    }

    savedBooking.theatreId = req.body.theatreId ? req.body.theatreId : savedBooking.theatreId;
    savedBooking.movieId = req.body.movieId ? req.body.movieId : savedBooking.movieId;
    savedBooking.userId = req.body.userId ? req.body.userId : savedBooking.userId;
    savedBooking.timing = req.body.timing ? req.body.timing : savedBooking.timing;
    savedBooking.noOfSeats = req.body.noOfSeats ? req.body.noOfSeats : savedBooking.noOfSeats;
    savedBooking.totalCost = savedBooking.noOfSeats * constants.ticketPrice;
    savedBooking.status = req.body.status ? req.body.status : savedBooking.status;

    try {
        const updatedBooking = await savedBooking.save();
        res.status(201).send(updatedBooking)
    } catch (error) {
        res.status(500).send({msg:"internal error"})
    }
}

exports.cancelBooking = async (req, res) => {
    const savedBooking = await savedBooking.findOne({_id:req.params.id});
    const savedUser = await User.findOne({
        userId:req.userId
    })
    if(!savedBooking){
        return res.status(400).send("Invalid Booking Id")
    }
    if(!savedBooking.userId.equals(savedUser._id)){
        return res.status(403).send("User has insufficient permissions to cancel this booking")
    }
    savedBooking.status=constants.bookingStatus.cancelled;
    try {
        const updatedooking = await savedBooking.save()
        res.status(201).send(updatedooking)
    } catch (error) {
        res.status(500).send({message:"Internal Error while updating the booking "+e.message});
    }
}
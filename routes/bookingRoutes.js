const express = require("express");
const bookingRoute = express.Router();

// const bookingController = require("../controllers/bookingController");

const {
  registerBooking,
  getBookings,
  deleteBooking,
} = require("../controllers/bookingController");

bookingRoute.post("/registerbooking",registerBooking);
bookingRoute.get("/getbookings", getBookings);
bookingRoute.delete("/deletebooking/:id",deleteBooking);

module.exports = bookingRoute;


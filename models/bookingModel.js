const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      match: [/.+\@.+\..+/, "Please fill a valid email address"],
    },
    mobile: {
      type: String,
      required: true,
      trim: true,
      match: [/^\d{10}$/, "Please fill a valid mobile number"],
    },
    message: {
      type: String,
      trim: true,
    },
    treatment: {
      type: mongoose.Schema.Types.ObjectId, // Reference the Treatment model by its ObjectId
      required: true,
      ref: "Treatment", // Reference the Treatment model
      trim: true,
    },
    branch: {
      type: mongoose.Schema.Types.ObjectId, // Reference the Branch model by its ObjectId
      required: true,
      ref: "Branch", // Reference the Branch model
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
    timeSlot: {
      type: String,
      required: true,
      enum: [
        "08:00 AM - 09:00 AM",
        "09:00 AM - 10:00 AM",
        "10:00 AM - 11:00 AM",
        "11:00 AM - 12:00 PM",
        "12:00 PM - 01:00 PM",
        "01:00 PM - 02:00 PM",
        "02:00 PM - 03:00 PM",
        "03:00 PM - 04:00 PM",
        "04:00 PM - 05:00 PM",
        "05:00 PM - 06:00 PM",
        "06:00 PM - 07:00 PM",
      ], // Add all available time slots
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;

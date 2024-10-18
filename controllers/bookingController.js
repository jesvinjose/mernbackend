const Booking = require("../models/bookingModel");
const Treatment = require("../models/treatmentModel");
const Branch = require("../models/branchModel");

const registerBooking = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      mobile,
      message,
      treatment,
      branch,
      date,
      timeSlot,
    } = req.body;

    // Check if required fields are present
    if (
      !firstName ||
      !lastName ||
      !email ||
      !mobile ||
      !treatment ||
      !branch ||
      !date ||
      !timeSlot
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if the selected treatment exists
    const treatmentExists = await Treatment.findById(treatment);
    if (!treatmentExists) {
      return res.status(404).json({ message: "Treatment not found." });
    }

    // Check if the selected branch exists
    const branchExists = await Branch.findById(branch);
    if (!branchExists) {
      return res.status(404).json({ message: "Branch not found." });
    }

    // Check if there are already 2 bookings for the same branch, date, and timeSlot
    const existingBookings = await Booking.find({
      branch,
      date,
      timeSlot,
    });

    if (existingBookings.length >= 2) {
      return res.status(400).json({
        message:
          "This time slot is fully booked. Please select another date or time slot.",
      });
    }

    // Create the booking
    const newBooking = new Booking({
      firstName,
      lastName,
      email,
      mobile,
      message,
      treatment,
      branch,
      date,
      timeSlot,
    });

    // Save booking to the database
    const savedBooking = await newBooking.save();

    return res.status(201).json({
      message: "Booking registered successfully",
      booking: savedBooking,
    });
  } catch (error) {
    console.error("Error registering booking:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("treatment", "name") // Populate treatment name
      .populate("branch", "place"); // Populate branch place
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to fetch bookings", error: error.message });
  }
};

const deleteBooking = async (req, res) => {
  try {
    const id = req.params.id;

    // Find the booking by ID and delete
    const deletedBooking = await Booking.findByIdAndDelete(id);

    // If booking not found, return an error response
    if (!deletedBooking) {
      return res.status(404).json({ message: "Booking not found." });
    }
    // Respond with a success message
    res.status(200).json({ message: "Booking deleted successfully." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to delete Booking", error: error.message });
  }
};

module.exports = {
  registerBooking,
  getBookings,
  deleteBooking,
};

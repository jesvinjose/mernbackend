const ContactMessage = require("../models/contactMessageModel");

const addContactMessage = async (req, res) => {
  try {
    const { firstName, lastName, email, mobile, message } = req.body;

    // console.log(jobvacancies);

    // console.log(designation);

    // Create a new contactmessage document
    const newContactMessage = new ContactMessage({
      firstName,
      lastName,
      email,
      mobile,
      message,
    });

    // Save the consultant to the database
    await newContactMessage.save();

    res.status(201).json({
      message: "ContactMessage added successfully",
      contactmessage: newContactMessage,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to add contactmessage", error: error.message });
  }
};

const getContactMessages = async (req, res) => {
  try {
    // Fetch all jobs from the database
    const contactmessages = await ContactMessage.find();

    // Respond with the list of jobs
    res.status(200).json(contactmessages);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch contactmessages",
      error: error.message,
    });
  }
};

const deleteContactMessage = async (req, res) => {
  try {
    const id = req.params.id;

    // Find the consultant by ID and delete
    const deletedContactMessage = await ContactMessage.findByIdAndDelete(id);
    // console.log(deletedContactMessage,'<------------deletedContactMessage');

    // If contactmessage not found, return an error response
    if (!deletedContactMessage) {
      return res.status(404).json({ message: "ContactMessage not found." });
    }

    // Respond with a success message
    res.status(200).json({ message: "ContactMessage deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to delete contactmessage",
      error: error.message,
    });
  }
};

const updateContactMessage = async (req, res) => {
  try {
    console.log("inside updateContactMessage");

    const id = req.params.id;
    const { firstName, lastName, email, mobile, message } = req.body;
    // console.log(req.body);

    // Fetch the existing treatment to get the current image path
    const existingContactMessage = await ContactMessage.findById(id);

    if (!existingContactMessage) {
      return res.status(404).json({ message: "ContactMessage not found." });
    }

    // Prepare the updated data
    let updatedData = {
      firstName,
      lastName,
      email,
      mobile,
      message,
    };

    // Update the contactmessage details
    const updatedContactMessage = await ContactMessage.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      message: "ContactMessage updated successfully",
      contactmessage: updatedContactMessage,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to update contactmessage", error: error.message });
  }
};

module.exports = {
  addContactMessage,
  getContactMessages,
  deleteContactMessage,
  updateContactMessage,
};

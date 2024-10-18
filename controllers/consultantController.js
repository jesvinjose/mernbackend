const Consultant = require("../models/consultantModel");

const addConsultant = async (req, res) => {
  try {
    const { name, qualification } = req.body;

    // Check if an image file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: "Image is required." });
    }

    // Extract the image path from the file object
    const imagePath = req.file.path;

    // Create a new consultant document
    const newConsultant = new Consultant({
      name,
      qualification,
      image: imagePath,
    });

    // Save the consultant to the database
    await newConsultant.save();

    res.status(201).json({
      message: "Consultant added successfully",
      consultant: newConsultant,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to add consultant", error: error.message });
  }
};

const getConsultants = async (req, res) => {
  try {
    const consultants = await Consultant.find();

    res.status(200).json(consultants);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to fetch consultants", error: error.message });
  }
};

const deleteConsultant = async (req, res) => {
  try {
    const id = req.params.id;

    // Find the consultant by ID and delete
    const deletedConsultant = await Consultant.findByIdAndDelete(id);
    // console.log(deleteConsultant,'<------------deleteConsultant');
    
    // If consultant not found, return an error response
    if (!deletedConsultant) {
      return res.status(404).json({ message: "Consultant not found." });
    }

    // Respond with a success message
    res.status(200).json({ message: "Consultant deleted successfully." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to delete consultant", error: error.message });
  }
};


const updateConsultant = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, qualification } = req.body;

    // Fetch the existing consultant to get the current image path
    const existingConsultant = await Consultant.findById(id);
    
    if (!existingConsultant) {
      return res.status(404).json({ message: "Consultant not found." });
    }

    // Prepare the updated data
    let updatedData = { 
      name, 
      qualification,
      image: existingConsultant.image // Set the existing image by default
    };

    // console.log(updatedData);
    
    // Check if a new image file was uploaded
    if (req.file) {
      const imagePath = req.file.path;
      updatedData.image = imagePath; // Update with the new image path
    }

    // Update the consultant details
    const updatedConsultant = await Consultant.findByIdAndUpdate(
      id,
      updatedData,
      { new: true, runValidators: true }
    );

    // console.log(updatedConsultant);
    
    res.status(200).json({
      message: "Consultant updated successfully",
      consultant: updatedConsultant,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update consultant", error: error.message });
  }
};

module.exports = {
  addConsultant,
  getConsultants,
  deleteConsultant,
  updateConsultant
};

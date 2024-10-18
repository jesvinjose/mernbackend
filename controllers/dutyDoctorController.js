const DutyDoctor = require("../models/dutyDoctorModel");

const addDutyDoctor = async (req, res) => {
  try {
    const { name, qualification } = req.body;

    // Check if an image file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: "Image is required." });
    }

    // Extract the image path from the file object
    const imagePath = req.file.path;

    // Create a new dutydoctor document
    const newDutyDoctor = new DutyDoctor({
      name,
      qualification,
      image: imagePath,
    });

    // Save the consultant to the database
    await newDutyDoctor.save();

    res.status(201).json({
      message: "DutyDoctor added successfully",
      dutydoctor: newDutyDoctor,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to add dutydoctor", error: error.message });
  }
};

const getDutyDoctors = async (req, res) => {
  try {
    // Fetch all duty doctors from the database
    const dutyDoctors = await DutyDoctor.find();

    // Respond with the list of duty doctors
    res.status(200).json(dutyDoctors);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to fetch duty doctors", error: error.message });
  }
};

const deleteDutyDoctor = async (req, res) => {
  try {
    const id = req.params.id;

    // Find the consultant by ID and delete
    const deletedDutyDoctor = await DutyDoctor.findByIdAndDelete(id);
    // console.log(deletedDutyDoctor,'<------------deletedDutyDoctor');

    // If consultant not found, return an error response
    if (!deletedDutyDoctor) {
      return res.status(404).json({ message: "DutyDoctor not found." });
    }

    // Respond with a success message
    res.status(200).json({ message: "DutyDoctor deleted successfully." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to delete dutydoctor", error: error.message });
  }
};


const updateDutyDoctor = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, qualification } = req.body;

    // Fetch the existing dutydoctor to get the current image path
    const existingDutyDoctor = await DutyDoctor.findById(id);
    
    if (!existingDutyDoctor) {
      return res.status(404).json({ message: "DutyDoctor not found." });
    }

    // Prepare the updated data
    let updatedData = { 
      name, 
      qualification,
      image: existingDutyDoctor.image // Set the existing image by default
    };

    // console.log(updatedData);
    
    // Check if a new image file was uploaded
    if (req.file) {
      const imagePath = req.file.path;
      updatedData.image = imagePath; // Update with the new image path
    }

    // Update the consultant details
    const updatedDutyDoctor = await DutyDoctor.findByIdAndUpdate(
      id,
      updatedData,
      { new: true, runValidators: true }
    );

    // console.log(updatedDutyDoctor);
    
    res.status(200).json({
      message: "DutyDoctor updated successfully",
      dutydoctor: updatedDutyDoctor,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update dutydoctor", error: error.message });
  }
};

module.exports = {
  addDutyDoctor,
  getDutyDoctors,
  deleteDutyDoctor,
  updateDutyDoctor
};

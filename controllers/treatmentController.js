const Treatment = require("../models/treatmentModel");

const addTreatment = async (req, res) => {
  try {
    const { name, description, bigDescription } = req.body;

    // Check if both images were uploaded
    if (!req.files || !req.files['image'] || !req.files['bigImage']) {
      return res.status(400).json({ message: "Both images are required." });
    }

    // Extract the image paths from the file objects
    const imagePath = req.files['image'][0].path;
    const bigImagePath = req.files['bigImage'][0].path;

    const newTreatment = new Treatment({
      name,
      description,
      bigDescription,
      image: imagePath,
      bigImage: bigImagePath,
    });

    // Save the treatment to the database
    await newTreatment.save();

    res.status(201).json({
      message: "Treatment added successfully",
      treatment: newTreatment,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to add treatment", error: error.message });
  }
};


const getTreatments = async (req, res) => {
  try {
    const treatments = await Treatment.find();

    res.status(200).json(treatments);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to fetch treatments", error: error.message });
  }
};

const deleteTreatment = async (req, res) => {
  try {
    const id = req.params.id;

    // Find the consultant by ID and delete
    const deletedTreatment = await Treatment.findByIdAndDelete(id);
    // console.log(deletedTreatment,'<------------deletedTreatment');

    // If treatment not found, return an error response
    if (!deletedTreatment) {
      return res.status(404).json({ message: "Treatment not found." });
    }

    // Respond with a success message
    res.status(200).json({ message: "Treatment deleted successfully." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to delete treatment", error: error.message });
  }
};

const updateTreatment = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, description, bigDescription } = req.body;

    // Fetch the existing treatment to get the current image paths
    const existingTreatment = await Treatment.findById(id);

    if (!existingTreatment) {
      return res.status(404).json({ message: "Treatment not found." });
    }

    // Prepare the updated data with existing values as defaults
    let updatedData = {
      name,
      description,
      bigDescription,
      image: existingTreatment.image, // Default to existing image
      bigImage: existingTreatment.bigImage, // Default to existing big image
    };

    // Check if new images were uploaded
    if (req.files) {
      if (req.files['image'] && req.files['image'][0]) {
        const imagePath = req.files['image'][0].path;
        updatedData.image = imagePath; // Update with new image path
      }
      if (req.files['bigImage'] && req.files['bigImage'][0]) {
        const bigImagePath = req.files['bigImage'][0].path;
        updatedData.bigImage = bigImagePath; // Update with new big image path
      }
    }

    // Update the treatment details
    const updatedTreatment = await Treatment.findByIdAndUpdate(
      id,
      updatedData,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: "Treatment updated successfully",
      treatment: updatedTreatment,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to update treatment", error: error.message });
  }
};


const getSingleTreatment = async (req, res) => {
  try {
    const id = req.params.id;
    const treatment = await Treatment.findById(id);
    if (!treatment) {
      return res.status(404).json({ message: "Treatment not found" });
    }
    return res.status(200).json({
      message: "Treatment found successfully",
      treatment,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to retrieve treatment", error: error.message });
  }
};


module.exports = {
  addTreatment,
  getTreatments,
  deleteTreatment,
  updateTreatment,
  getSingleTreatment
};

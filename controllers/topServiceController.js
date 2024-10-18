const topServiceModel = require("../models/topServiceModel");
const treatmentModel = require("../models/treatmentModel");

const addTopService = async (req, res) => {
  try {
    const { service } = req.body;

    // console.log(service);

    // Check if the treatment exists by its ObjectId
    const treatment = await treatmentModel.findById(service);

    // console.log(treatment);

    if (!treatment) {
      return res.status(404).json({
        message: "Treatment not found",
        success:false
      });
    }

    // Extract the treatment's name
    const treatmentName = treatment.name;

    // Check if the top service with this treatment already exists
    const topserviceExists = await topServiceModel.findOne({ service });

    if (!topserviceExists) {
      // If not found, create a new top service
      const newTopService = new topServiceModel({
        name: treatmentName, // Use the treatment's name
        service: treatment._id, // Store the treatment ID in the top service
      });

      await newTopService.save();

      return res.status(201).json({
        message: "Topservice added successfully",
        topservice: newTopService,        
        success:true
      });
    } else {
      return res.status(400).json({
        message: "This treatment is already added to top services",
        success:false
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to add top service",
      error: error.message,      
      success:false
    });
  }
};

const getTopServices = async (req, res) => {
  try {
    const topservices = await topServiceModel.find();

    res.status(200).json(topservices);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to fetch topservices", error: error.message });
  }
};

const deleteTopService = async (req, res) => {
  try {
    const id = req.params.id;

    // Find the consultant by ID and delete
    const deletedTopService = await topServiceModel.findByIdAndDelete(id);
    // console.log(deletedTreatment,'<------------deletedTreatment');

    // If treatment not found, return an error response
    if (!deletedTopService) {
      return res.status(404).json({ message: "TopService not found." });
    }

    // Respond with a success message
    res.status(200).json({ message: "TopService deleted successfully." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to delete topservice", error: error.message });
  }
};

module.exports = {
  addTopService,
  getTopServices,
  deleteTopService,
};

const Branch = require("../models/branchModel");

const addBranch = async (req, res) => {
  try {
    const { place, mobile, latitude, longitude } = req.body;

    // Check if an image file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: "Image is required." });
    }

    // Extract the image path from the file object
    const imagePath = req.file.path;

    const newBranch = new Branch({
      place,
      mobile,
      latitude, 
      longitude,
      image: imagePath,
    });
    
    // Save the treatment to the database
    await newBranch.save();

    res.status(201).json({
      message: "Branch added successfully",
      branch: newBranch,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to add branch", error: error.message });
  }
};

const getBranch = async (req, res) => {
  try {
    const branch = await Branch.find();

    res.status(200).json(branch);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to fetch branch", error: error.message });
  }
};

const deleteBranch = async (req, res) => {
  try {
    const id = req.params.id;
   
    // Find the branch by ID and delete
    const deletedBranch = await Branch.findByIdAndDelete(id);

    // If branch not found, return an error response
    if (!deletedBranch) {
      return res.status(404).json({ message: "Branch not found." });
    }

    // Respond with a success message
    res.status(200).json({ message: "Branch deleted successfully." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to delete Branch", error: error.message });
  }
};

const updateBranch = async (req, res) => {
  try {
    const id = req.params.id;
    const { place, mobile, latitude, longitude } = req.body; // Extract latitude and longitude

    // Fetch the existing branch to get the current image path
    const existingBranch = await Branch.findById(id);

    if (!existingBranch) {
      return res.status(404).json({ message: "Branch not found." });
    }

    // Prepare the updated data
    let updatedData = { 
      place, 
      mobile,
      latitude: parseFloat(latitude), // Ensure lat/lng are stored as numbers
      longitude: parseFloat(longitude),
      image: existingBranch.image // Use the existing image by default unless a new one is uploaded
    };

    // If a new image is uploaded, use it
    if (req.file) {
      updatedData.image = req.file.path;
    }

    // Update the branch in the database
    const updatedBranch = await Branch.findByIdAndUpdate(id, updatedData, {
      new: true
    });

    res.status(200).json({ branch: updatedBranch });
  } catch (error) {
    console.error("Error updating branch:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};


// const updateBranch = async (req, res) => {
//   try {
//     const id = req.params.id;
//     console.log("her hher ------>>>>");
    
//     console.log(id, "my id------->>>>.");
    
//     const { place, mobile } = req.body;

//     console.log(place, "Here here here ");
    
//     // Fetch the existing branch to get the current image path
//     const existingBranch = await Branch.findById(id);
//     console.log(existingBranch,"My branch");
    
//     if (!existingBranch) {
//       return res.status(404).json({ message: "Branch not found." });
//     }

//     // Prepare the updated data
//     let updatedData = { 
//       place, 
//       mobile,
//       image: existingBranch.image // Set the existing image by default
//     };

//     // console.log(updatedData);
    
//     // Check if a new image file was uploaded
//     if (req.file) {
//       const imagePath = req.file.path;
//       updatedData.image = imagePath; // Update with the new image path
//     }

//     // Update the consultant details
//     const updatedBranch = await Branch.findByIdAndUpdate(
//       id,
//       updatedData,
//       { new: true, runValidators: true }
//     );

//     // console.log(updatedConsultant);
    
//     res.status(200).json({
//       message: "Branch updated successfully",
//       branch: updatedBranch,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Failed to update branch", error: error.message });
//   }
// };

module.exports = {
  addBranch,
  getBranch,
  deleteBranch,
  updateBranch
};
const Application = require("../models/applicationModel");
const path = require("path");
const fs = require("fs");

const addApplication = async (req, res) => {
  try {
    const { name, mobile, email, designation } = req.body;

    // console.log(req.body, "<------------req.body");

    // Check if a resume file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: "Resume is required." });
    }

    // Extract the image path from the file object
    const resumeFilePath = req.file.path;

    // Create a new dutydoctor document
    const newApplication = new Application({
      name,
      mobile,
      email,
      designation,
      resumeFile: resumeFilePath,
    });

    // Save the consultant to the database
    await newApplication.save();

    res.status(201).json({
      message: "application added successfully",
      application: newApplication,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to add application", error: error.message });
  }
};

const getApplications = async (req, res) => {
  try {
    // const applications = await Application.find();

    // res.status(200).json(applications);

    // Fetch all applications and populate the `designation` field with job details
    const applications = await Application.find().populate("designation");
    // console.log(applications,"<----------applications-");

    res.status(200).json(applications);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to fetch applications", error: error.message });
  }
};

const deleteApplication = async (req, res) => {
  try {
    // console.log("inside deleteApplication");

    const id = req.params.id;

    // Find the consultant by ID and delete
    const deletedApplication = await Application.findByIdAndDelete(id);
    // console.log(deletedApplication,'<------------deletedApplication');

    // If consultant not found, return an error response
    if (!deletedApplication) {
      return res.status(404).json({ message: "Application not found." });
    }

    // Respond with a success message
    res.status(200).json({ message: "Application deleted successfully." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to delete application", error: error.message });
  }
};

const updateApplication = async (req, res) => { 
    try {
      const id = req.params.id;
      let { name, mobile, email, designation } = req.body;
  
      // Fetch the existing application to get the current values
      const existingApplication = await Application.findById(id);
  
      if (!existingApplication) {
        return res.status(404).json({ message: "Application not found." });
      }
  
      // Handle empty fields by keeping the old value
      if (name === "") {
        name = existingApplication.name;
      }
      if (mobile === "") {
        mobile = existingApplication.mobile;
      }
      if (email === "") {
        email = existingApplication.email;
      }
      // If designation is not provided, use the existing designation ObjectId
      if (!designation || designation === "") {
        designation = existingApplication.designation;
      }
  
      // Prepare the updated data
      let updatedData = {
        name,
        mobile,
        email,
        designation,
        resumeFile: existingApplication.resumeFile, // Set the existing resume by default
      };
  
      // Check if a new resume file was uploaded
      if (req.file) {
        const resumePath = req.file.path;
        updatedData.resumeFile = resumePath; // Update with the new resume path
      }
  
      // Update the application details
      const updatedApplication = await Application.findByIdAndUpdate(
        id,
        updatedData,
        { new: true, runValidators: true }
      );
  
      res.status(200).json({
        message: "Application updated successfully",
        application: updatedApplication,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to update application", error: error.message });
    }
  }; 
  

// const updateApplication = async (req, res) => {
//   try {
//     const id = req.params.id;
//     let { name, mobile, email, designation } = req.body;



//     // Fetch the existing consultant to get the current image path
//     const existingApplication = await Application.findById(id);

//     if (!existingApplication) {
//       return res.status(404).json({ message: "Application not found." });
//     }

//     if(name==""){
//         name=existingApplication.name
//     }

//     if(mobile==""){
//         mobile=existingApplication.mobile;
//     }

//     if(email==""){
//         email=existingApplication.email;
//     }

//     if(designation==""){
//         designation=existingApplication.designation;
//     }

//     // Prepare the updated data
//     let updatedData = {
//       name,
//       mobile,
//       email,
//       designation,
//       resumeFile: existingApplication.resumeFile, // Set the existing resume by default
//     };

//     // console.log(updatedData);

//     // Check if a new image file was uploaded
//     if (req.file) {
//       const resumePath = req.file.path;
//       updatedData.resumeFile = resumePath; // Update with the new resume path
//     }

//     // Update the consultant details
//     const updatedApplication = await Application.findByIdAndUpdate(
//       id,
//       updatedData,
//       { new: true, runValidators: true }
//     );

//     // console.log(updatedConsultant);

//     res.status(200).json({
//       message: "Application updated successfully",
//       application: updatedApplication,
//     });
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .json({ message: "Failed to update application", error: error.message });
//   }
// };

const downloadResume = async (req, res) => {
  const filename = req.params.filename;
  console.log(__dirname);

  const filePath = path.join(
    __dirname,
    "..",
    "..",
    "backend",
    "public",
    "uploads",
    "resumes",
    filename
  );

//   console.log(filename, "<--------------filename");

  res.download(filePath, fs.constants.F_OK, (err) => {
    // Check if file exists before attempting to download
    if (err) {
      console.error("Error downloading file:", err);
      res.status(500).send("Error downloading file");
    }
  });
};

module.exports = {
  addApplication,
  getApplications,
  deleteApplication,
  updateApplication,
  downloadResume,
};

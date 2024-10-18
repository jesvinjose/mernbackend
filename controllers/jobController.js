const Job = require("../models/jobModel");

const addJob = async (req, res) => {
  try {
    const { designation, jobvacancies } = req.body;

    // console.log(jobvacancies);

    // console.log(designation);

    // Create a new job document
    const newJob = new Job({
      designation,
      jobvacancies,
    });

    // Save the consultant to the database
    await newJob.save();

    res.status(201).json({
      message: "Job added successfully",
      job: newJob,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to add job", error: error.message });
  }
};

const getJobs = async (req, res) => {
  try {
    // Fetch all jobs from the database
    const jobs = await Job.find();

    // Respond with the list of jobs
    res.status(200).json(jobs);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to fetch jobs", error: error.message });
  }
};

const deleteJob = async (req, res) => {
  try {
    const id = req.params.id;

    // Find the consultant by ID and delete
    const deletedJob = await Job.findByIdAndDelete(id);
    // console.log(deletedTreatment,'<------------deletedTreatment');

    // If treatment not found, return an error response
    if (!deletedJob) {
      return res.status(404).json({ message: "Job not found." });
    }

    // Respond with a success message
    res.status(200).json({ message: "Job deleted successfully." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to delete job", error: error.message });
  }
};

const updateJob = async (req, res) => {
  try {
    // console.log('inside updateJob');
    
    const id = req.params.id;
    const { designation, jobvacancies } = req.body;
    // console.log(req.body);
    
    // Fetch the existing treatment to get the current image path
    const existingJob = await Job.findById(id);

    if (!existingJob) {
      return res.status(404).json({ message: "Job not found." });
    }

    // Prepare the updated data
    let updatedData = {
      designation,
      jobvacancies,
    };

    // Update the job details
    const updatedJob = await Job.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      message: "Job updated successfully",
      job: updatedJob,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to update job", error: error.message });
  }
};

module.exports = {
  addJob,
  getJobs,
  deleteJob,
  updateJob,
};

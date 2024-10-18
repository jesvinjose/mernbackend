const mongoose = require("mongoose");

const applicationSchema = mongoose.Schema(
  {
    designation: {
      type: mongoose.Schema.Types.ObjectId, // Reference the Job model by its ObjectId
      required: true,
      ref: "Job", // Reference the Job model
      trim: true,
    },
    name: {
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
    resumeFile: {
      type: String,
      required: true, // Path to the resume file
    },
  },
  {
    timestamps: true,
  }
);

const Application = mongoose.model("Application", applicationSchema);
module.exports = Application;

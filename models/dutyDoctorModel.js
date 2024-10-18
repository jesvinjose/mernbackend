const mongoose = require("mongoose");

const dutyDoctorSchema = mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    qualification: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically creates `createdAt` and `updatedAt` fields
  }
);

const DutyDoctor = mongoose.model("DutyDoctor", dutyDoctorSchema);
module.exports = DutyDoctor;

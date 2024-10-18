const mongoose = require("mongoose");

const consultantSchema = mongoose.Schema(
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

const Consultant = mongoose.model("Consultant", consultantSchema);
module.exports = Consultant;

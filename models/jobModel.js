const mongoose = require('mongoose');

const jobSchema = mongoose.Schema({
  designation: {
    type: String,
    required: true,
    unique: true, // Ensures that each job designation is unique
    trim: true // Removes leading and trailing whitespace
  },
  jobvacancies: {
    type: Number,
    required: true,
    min: 0 // Ensures the number of posts is not negative
  }
}, {
  timestamps: true // Automatically creates `createdAt` and `updatedAt` fields
});

const Job = mongoose.model('Job', jobSchema);
module.exports = Job;

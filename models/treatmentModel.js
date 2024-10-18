const mongoose = require('mongoose');

const treatmentSchema = mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  bigImage:{
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true // Removes leading and trailing whitespace
  },
  description: {
    type: String,
    required: true
  },
  bigDescription:{
    type:String,
    required: true
  }
}, {
  timestamps: true // Automatically creates `createdAt` and `updatedAt` fields
});

const Treatment = mongoose.model('Treatment', treatmentSchema);
module.exports = Treatment;

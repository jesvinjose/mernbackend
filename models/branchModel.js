const mongoose = require('mongoose');

const branchSchema = mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  place: {
    type: String,
    required: true,
    trim: true // Removes leading and trailing whitespace
  },
  mobile: {
    type: Number,
    required: true
  },
  latitude: { 
    type: Number,
     required: true 
    },  
  longitude: { 
    type: Number, 
    required: true 
  },
}, {
  timestamps: true // Automatically creates `createdAt` and `updatedAt` fields
});

const Branch = mongoose.model('Branch', branchSchema);
module.exports = Branch;
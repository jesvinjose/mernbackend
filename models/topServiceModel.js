const mongoose = require('mongoose');
const { Schema } = mongoose;

const topServiceSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true // Trim leading/trailing whitespace
  },
  service: {  // Change to singular since it's now one ObjectId
    type: Schema.Types.ObjectId, 
    ref: 'Treatment',  // Reference to the Treatment model
    required: true
  },
}, {
  timestamps: true // Automatically adds `createdAt` and `updatedAt`
});

const TopService = mongoose.model('TopService', topServiceSchema);
module.exports = TopService;

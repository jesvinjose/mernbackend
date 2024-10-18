const mongoose = require("mongoose");

const contactDetailsSchema = mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    instagram: {
      type: String,
      // required: true,
    },

    facebook: {
        type: String,
        // required: true,
      },
      twitter: {
        type: String,
        // required: true,
      },
      linkdin: {
        type: String,
        // required: true,
      },
  }
  
);

const ContactDetails = mongoose.model("ContactDetails", contactDetailsSchema);
module.exports = ContactDetails;

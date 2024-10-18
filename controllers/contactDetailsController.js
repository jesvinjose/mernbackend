const ContactDetails = require("../models/contactDetailsModel");

const addContactDetails = async (req, res) => {
  try {
    const { email, instagram, facebook, twitter, linkdin } = req.body;

    console.log(req.body);
    

    // Check if an image file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: "Image is required." });
    }

    // Extract the image path from the file object
    const image = req.file.path;

    // Create a new contact details
    const newContactDetails = new ContactDetails({
      email,
      instagram,
      facebook,
      twitter,
      linkdin,
      image: image,
    });

    // Save the consultant to the database
    await newContactDetails.save();

    res.status(201).json({
      message: "Contacts added successfully",
      contactDetails: newContactDetails,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to add contacts", error: error.message });
  }
};

const getContactDetails = async (req, res) => {
  try {
    const contactDetails = await ContactDetails.find();
    if (!contactDetails || contactDetails.length === 0) {
      return res.status(404).json({ message: "No contact details found" });
    }
    res.status(200).json(contactDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch contacts",
      error: error.message,
    });
  }
};


//Delete contact details

const deleteContactDetails = async (req, res) => {
  try {
    const id = req.params.id;

    // Find the consultant by ID and delete
    const deletedContacts = await ContactDetails.findByIdAndDelete(id);
    // console.log(deleteConsultant,'<------------deleteConsultant');

    // If consultant not found, return an error response
    if (!deletedContacts) {
      return res.status(404).json({ message: "Contacts not found." });
    }

    // Respond with a success message
    res.status(200).json({ message: "Contacts deleted successfully." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to delete contacts", error: error.message });
  }
};

const updateContacts = async (req, res) => {
  console.log("inside update-------->>>>>");

  try {
    const id = req.params.id;
    const { email, instagram, facebook, twitter, linkdin } = req.body;

    // Fetch the existing treatment to get the current image paths
    const existingContacts = await ContactDetails.findById(id);

    if (!existingContacts) {
      return res.status(404).json({ message: "Contacts not found." });
    }

    // Prepare the updated data with existing values as defaults
    let updatedData = {
      email,
      instagram,
      facebook,
      twitter,
      linkdin,
      image: existingContacts.image, // Default to existing image
      // bigImage: existingTreatment.bigImage, // Default to existing big image
    };

    // Check if new images were uploaded
    if (req.files) {
      if (req.files["image"] && req.files["image"][0]) {
        const imagePath = req.files["image"][0].path;
        updatedData.image = imagePath; // Update with new image path
      }
      // if (req.files['bigImage'] && req.files['bigImage'][0]) {
      //   const bigImagePath = req.files['bigImage'][0].path;
      //   updatedData.bigImage = bigImagePath; // Update with new big image path
      // }
    }

    // Update the treatment details
    const updatedContacts = await ContactDetails.findByIdAndUpdate(
      id,
      updatedData,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: "Contacts updated successfully",
      contacts: updatedContacts,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to update contacts", error: error.message });
  }
};

module.exports = {
  addContactDetails,
  getContactDetails,
  deleteContactDetails,
  updateContacts,
};

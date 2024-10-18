const Testimonial = require("../models/testimonialModel");

const addTestimonial = async (req, res) => {
  try {
    const { name, designation, message, videoUrl } = req.body;

    // Check if an image file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: "Image is required." });
    }

    // Extract the image path from the file object
    const imagePath = req.file.path;

    const newTestimonial = new Testimonial({
      name: name,
      designation: designation,
      image: imagePath,
      message: message,
      videoUrl: videoUrl,
    });

    await newTestimonial.save();

    return res.status(201).json({
      message: "Testimonial added successfully",
      success: true,
      testimonial:newTestimonial
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to add testimonial",
      error: error.message,
      success: false,
    });
  }
};

const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    return res.status(200).json(testimonials);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to fetch testimonials", error: error.message });
  }
};

const deleteTestimonial = async (req, res) => {
  try {
    const id = req.params.id;

    // Find the consultant by ID and delete
    const deletedTestimonial = await Testimonial.findByIdAndDelete(id);
    // console.log(deletedTreatment,'<------------deletedTreatment');

    // If treatment not found, return an error response
    if (!deletedTestimonial) {
      return res.status(404).json({ message: "Testimonial not found." });
    }

    // Respond with a success message
    res.status(200).json({ message: "Testimonial deleted successfully." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to delete testimonial", error: error.message });
  }
};

module.exports = {
  addTestimonial,
  deleteTestimonial,
  getTestimonials,
};

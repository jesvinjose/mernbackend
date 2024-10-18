const express = require("express");
const testimonialRoute = express.Router();
const  { uploadSingleImage } = require("../uploadImageConfig");
const testimonialController = require("../controllers/testimonialController");

testimonialRoute.post(
  "/addtestimonial",
  uploadSingleImage,
  testimonialController.addTestimonial
);

testimonialRoute.get("/gettestimonials", testimonialController.getTestimonials);

testimonialRoute.delete("/deletetestimonial/:id", testimonialController.deleteTestimonial);

module.exports=testimonialRoute;
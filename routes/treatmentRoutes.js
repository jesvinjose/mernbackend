const express = require("express");
const treatmentRoute = express.Router();
const { uploadMultipleImages } = require("../uploadImageConfig");
const treatmentController = require("../controllers/treatmentController");
const multer = require("multer");

treatmentRoute.post(
  "/addtreatment",
  uploadMultipleImages,
  treatmentController.addTreatment
);

treatmentRoute.get("/gettreatments", treatmentController.getTreatments);

treatmentRoute.get(
  "/getsingletreatment/:id",
  treatmentController.getSingleTreatment
);

treatmentRoute.delete(
  "/deletetreatment/:id",
  treatmentController.deleteTreatment
);

treatmentRoute.put(
  "/updatetreatment/:id",
  uploadMultipleImages,
  treatmentController.updateTreatment
);

module.exports = treatmentRoute;

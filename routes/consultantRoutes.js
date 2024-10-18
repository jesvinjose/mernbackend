const express = require("express");
const consultantRoute = express.Router();
const { uploadSingleImage } = require("../uploadImageConfig");
const consultantController = require("../controllers/consultantController");

consultantRoute.post(
  "/addconsultant",
  uploadSingleImage,
  consultantController.addConsultant
);
consultantRoute.get("/getconsultants", consultantController.getConsultants);
consultantRoute.delete(
  "/deleteconsultant/:id",
  consultantController.deleteConsultant
);
consultantRoute.put(
  "/updateconsultant/:id",
  uploadSingleImage,
  consultantController.updateConsultant
);

module.exports = consultantRoute;

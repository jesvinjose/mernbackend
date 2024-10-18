const express = require("express");
const dutyDoctorRoute = express.Router();
const {uploadSingleImage} = require("../uploadImageConfig");
const dutyDoctorController = require("../controllers/dutyDoctorController");

dutyDoctorRoute.post(
  "/adddutydoctor",
  uploadSingleImage,
  dutyDoctorController.addDutyDoctor
);

dutyDoctorRoute.get("/getdutydoctors", dutyDoctorController.getDutyDoctors);

dutyDoctorRoute.delete(
  "/deletedutydoctor/:id",
  dutyDoctorController.deleteDutyDoctor
);

dutyDoctorRoute.put(
  "/updatedutydoctor/:id",
  uploadSingleImage,
  dutyDoctorController.updateDutyDoctor
);

module.exports = dutyDoctorRoute;

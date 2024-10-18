const express = require("express");
const branchRoute = express.Router();
const  { uploadSingleImage } = require("../uploadImageConfig");
const branchController = require("../controllers/branchController");

branchRoute.post(
  "/addbranch",
  uploadSingleImage,
  branchController.addBranch
);

branchRoute.get("/getbranch", branchController.getBranch);

branchRoute.delete("/deletebranch/:id", branchController.deleteBranch);

branchRoute.put(
  "/updatebranch/:id",
  uploadSingleImage,
  branchController.updateBranch
);

module.exports = branchRoute;

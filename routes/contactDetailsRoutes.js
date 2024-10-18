const express=require('express');
const contactDetailsRoute=express.Router();

const  { uploadSingleImage } = require("../uploadImageConfig");
const { uploadMultipleImages } = require("../uploadImageConfig");


const contactDetailsController=require('../controllers/contactDetailsController');

//adminlogin

contactDetailsRoute.post('/addDetails',uploadSingleImage,contactDetailsController.addContactDetails);
contactDetailsRoute.get("/getcontacts", contactDetailsController.getContactDetails);
contactDetailsRoute.delete("/deletecontact/:id",contactDetailsController.deleteContactDetails);
contactDetailsRoute.put("/updatecontacts/:id",uploadMultipleImages,contactDetailsController.updateContacts);

module.exports=contactDetailsRoute;
const express = require("express");
const topServiceRoute = express.Router();
const topServiceController = require("../controllers/topServiceController");


topServiceRoute.post("/addtotopservices",topServiceController.addTopService);
topServiceRoute.delete("/deletetopservice/:id",topServiceController.deleteTopService);
topServiceRoute.get("/getalltopservices",topServiceController.getTopServices);

module.exports=topServiceRoute;
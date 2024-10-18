const express = require("express");

const contactMessageRoute = express.Router();

const contactMessageController = require("../controllers/contactMessageController");

contactMessageRoute.post(
  "/addcontactmessage",
  contactMessageController.addContactMessage
);
contactMessageRoute.get(
  "/getcontactmessages",
  contactMessageController.getContactMessages
);
contactMessageRoute.delete(
  "/deletecontactmessage/:id",
  contactMessageController.deleteContactMessage
);
contactMessageRoute.put(
  "/updatecontactmessage/:id",
  contactMessageController.updateContactMessage
);

module.exports = contactMessageRoute;

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb(null, 'public/resumes'); // Destination folder for image uploads
    cb(null, "public/uploads/resumes"); // Destination folder for image uploads
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Customize the filename
  },
});

const uploadResume = multer({ storage: storage });

module.exports = uploadResume;

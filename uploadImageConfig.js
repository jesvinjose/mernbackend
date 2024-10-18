const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/images'); // Destination folder for image uploads
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Customize the filename
  },
});

// Initialize multer with the storage configuration
const uploadImage = multer({ storage: storage });

// Export both single and multiple uploads
const uploadSingleImage = uploadImage.single('image'); // Single upload for other routes
const uploadMultipleImages = uploadImage.fields([
  { name: 'image', maxCount: 1 },
  { name: 'bigImage', maxCount: 1 },
]);

module.exports = {
  uploadSingleImage,
  uploadMultipleImages,
};

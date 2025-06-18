// upload.js
const multer = require('multer');
const path = require('path');

// Storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // destination folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedTypes.test(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed'));
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;

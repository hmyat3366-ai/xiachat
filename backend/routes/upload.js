const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');
const multer = require('multer');

// Configure multer memory storage with limits
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter: (req, file, cb) => {
    // Allow all files up to 5MB, not just images
    cb(null, true);
  }
});

router.post('/', upload.single('file'), uploadController.uploadImage);

module.exports = router;

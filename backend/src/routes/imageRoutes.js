const express = require('express');
const router = express.Router();
const multer = require('multer');
const imageController = require('../controllers/imageController');

// Configure multer to use RAM (buffer) rather than disk since we'll save straight to MongoDB
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 16 * 1024 * 1024 } // 16MB max
});

router.post('/', upload.single('image'), imageController.uploadImage);
router.get('/:id', imageController.getImage);

module.exports = router;

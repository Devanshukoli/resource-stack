const express = require('express');
const router = express.Router();
const resourceController = require('../controllers/resourceController');

// Get all resources
router.get('/', resourceController.getAllResources);

// Get a single resource by ID
router.get('/:id', resourceController.getResourceById);

// Create a new resource
router.post('/', resourceController.createResource);

// Update a resource
router.put('/:id', resourceController.updateResource);

// Update check status
router.patch('/:id/check', resourceController.updateCheckStatus);

// Delete a resource
router.delete('/:id', resourceController.deleteResource);

module.exports = router;

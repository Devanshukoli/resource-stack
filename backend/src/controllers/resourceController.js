const Resource = require('../models/Resource');

// Get all resources
exports.getAllResources = async (req, res) => {
  try {
    const resources = await Resource.find().sort({ createdAt: -1 });
    res.status(200).json(resources);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching resources', error: error.message });
  }
};

// Get a single resource by ID
exports.getResourceById = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    
    res.status(200).json(resource);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching resource', error: error.message });
  }
};

// Create a new resource
exports.createResource = async (req, res) => {
  try {
    const { title, content, isChecked, feedback } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    const resource = new Resource({
      title,
      content,
      isChecked: isChecked || false,
      feedback: feedback || ''
    });

    await resource.save();
    res.status(201).json(resource);
  } catch (error) {
    res.status(500).json({ message: 'Error creating resource', error: error.message });
  }
};

// Update a resource
exports.updateResource = async (req, res) => {
  try {
    const { title, content, feedback, isChecked } = req.body;
    
    const resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    if (title !== undefined) resource.title = title;
    if (content !== undefined) resource.content = content;
    if (feedback !== undefined) resource.feedback = feedback;
    if (isChecked !== undefined) resource.isChecked = isChecked;

    await resource.save();
    res.status(200).json(resource);
  } catch (error) {
    res.status(500).json({ message: 'Error updating resource', error: error.message });
  }
};

// Update check status of a resource
exports.updateCheckStatus = async (req, res) => {
  try {
    const { isChecked } = req.body;

    if (isChecked === undefined) {
      return res.status(400).json({ message: 'isChecked field is required' });
    }

    const resource = await Resource.findByIdAndUpdate(
      req.params.id,
      { isChecked },
      { new: true }
    );

    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    res.status(200).json(resource);
  } catch (error) {
    res.status(500).json({ message: 'Error updating resource', error: error.message });
  }
};

// Delete a resource
exports.deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findByIdAndDelete(req.params.id);

    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    res.status(200).json({ message: 'Resource deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting resource', error: error.message });
  }
};

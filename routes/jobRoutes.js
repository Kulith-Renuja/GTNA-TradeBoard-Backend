const express = require('express');
const router = express.Router();
const JobRequest = require('../models/JobRequest');

// POST /api/jobs - Create a new job
router.post('/', async (req, res, next) => {
  try {
    const { title, description, contactEmail, ...otherFields } = req.body;

    // Basic input validation
    if (!title || !description || !contactEmail) {
      return res.status(400).json({ error: 'title, description, and contactEmail are required fields.' });
    }

    // Email format validation using regex
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(contactEmail)) {
      return res.status(400).json({ error: 'contactEmail is not a valid email address.' });
    }

    const job = new JobRequest({
      title,
      description,
      contactEmail,
      ...otherFields
    });

    const savedJob = await job.save();
    res.status(201).json(savedJob);
  } catch (error) {
    next(error);
  }
});

// GET /api/jobs - List all jobs with optional filters
router.get('/', async (req, res, next) => {
  try {
    const { category, status } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (status) filter.status = status;

    const jobs = await JobRequest.find(filter).sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    next(error);
  }
});

// GET /api/jobs/:id - Fetch a single job by its MongoDB ID
router.get('/:id', async (req, res, next) => {
  try {
    const job = await JobRequest.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ error: 'Job request not found.' });
    }
    res.status(200).json(job);
  } catch (error) {
    // Handle invalid ObjectId format
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid Job ID format.' });
    }
    next(error);
  }
});

// PATCH /api/jobs/:id - Update ONLY the status of a specific job
router.patch('/:id', async (req, res, next) => {
  try {
    const { status } = req.body;
    
    if (!status) {
      return res.status(400).json({ error: 'Status is required to update.' });
    }

    const allowedStatuses = ['Open', 'In Progress', 'Closed'];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status value. Must be Open, In Progress, or Closed.' });
    }

    const updatedJob = await JobRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedJob) {
      return res.status(404).json({ error: 'Job request not found.' });
    }

    res.status(200).json(updatedJob);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid Job ID format.' });
    }
    next(error);
  }
});

// DELETE /api/jobs/:id - Delete a specific job
router.delete('/:id', async (req, res, next) => {
  try {
    const deletedJob = await JobRequest.findByIdAndDelete(req.params.id);
    if (!deletedJob) {
      return res.status(404).json({ error: 'Job request not found.' });
    }
    res.status(200).json({ message: 'Job request deleted successfully.' });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid Job ID format.' });
    }
    next(error);
  }
});

module.exports = router;

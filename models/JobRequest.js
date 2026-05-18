const mongoose = require('mongoose');

const jobRequestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    // e.g., Plumbing, Electrical, Painting, Joinery
  },
  location: {
    type: String,
  },
  contactName: {
    type: String,
  },
  contactEmail: {
    type: String,
    validate: {
      validator: function(v) {
        // Simple regex for email validation
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: props => `${props.value} is not a valid email address!`
    }
  },
  status: {
    type: String,
    enum: ['Open', 'In Progress', 'Closed'],
    default: 'Open',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('JobRequest', jobRequestSchema);

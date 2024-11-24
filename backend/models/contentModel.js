const mongoose = require('mongoose');

const contentSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  synopsis: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

const Content = mongoose.model('Content', contentSchema);

module.exports = Content;
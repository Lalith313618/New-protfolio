const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const experienceSchema = new Schema({
  company: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  highlights: [{
    type: String
  }],
  technologies: [{
    type: String
  }]
}, { timestamps: true });

module.exports = mongoose.model('Experience', experienceSchema);
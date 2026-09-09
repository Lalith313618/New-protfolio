const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  tagline: {
    type: String
  },
  description: {
    type: String
  },
  category: {
    type: String
  },
  highlights: [{
    type: String
  }],
  technologies: [{
    type: String
  }],
  githubLink: {
    type: String
  },
  demoLink: {
    type: String
  },
  image: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
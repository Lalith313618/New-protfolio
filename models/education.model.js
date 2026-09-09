const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const educationSchema = new Schema({
  institution: {
    type: String,
    required: true
  },
  degree: {
    type: String,
    required: true
  },
  graduationYear: {
    type: Number
  },
  percentage: {
    type: String
  },
  period: {
    type: String
  },
  score: {
    type: String
  },
  highlights: [{
    type: String
  }]
}, { timestamps: true });

module.exports = mongoose.model('Education', educationSchema);
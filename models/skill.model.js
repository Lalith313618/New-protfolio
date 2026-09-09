const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const skillSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  category: {
    type: String,
    enum: ['frontend', 'backend', 'fullstack', 'devops', 'tools', 'other'],
    default: 'other'
  }
}, { timestamps: true });

module.exports = mongoose.model('Skill', skillSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  summary: {
    type: String
  },
  location: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);
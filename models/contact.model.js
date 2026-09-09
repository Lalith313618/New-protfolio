const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  address: {
    type: String
  },
  linkedin: {
    type: String
  },
  github: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);
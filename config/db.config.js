const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/portfolio', {
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = db;
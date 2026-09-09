const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const dns = require('dns');

dotenv.config();

// Ensure SRV DNS lookup succeeds on networks with restricted ISP DNS
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {
  // Ignore if not supported in environment
}

const errorHandler = require('./middleware/error.middleware');
const profileRoute = require('./routes/profile.route');
const skillRoute = require('./routes/skill.route');
const educationRoute = require('./routes/education.route');
const experienceRoute = require('./routes/experience.route');
const projectRoute = require('./routes/project.route');
const contactRoute = require('./routes/contact.route');

const app = express();

app.use(express.json());

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    return res.status(200).json({});
  }
  next();
});

// Root health check route
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    message: 'Portfolio Backend API is running',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/profile', profileRoute);
app.use('/api/skills', skillRoute);
app.use('/api/education', educationRoute);
app.use('/api/experience', experienceRoute);
app.use('/api/projects', projectRoute);
app.use('/api/contact', contactRoute);

// Error handler middleware
app.use(errorHandler);

// Default error handler for unknown routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;

// Start server whether MongoDB connects or fails
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio', {
  serverSelectionTimeoutMS: 3000,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.warn('MongoDB connection failed. Running with in-memory fallbacks:', err.message);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
const Experience = require('../models/experience.model');

exports.getExperience = async (req, res) => {
  try {
    const experience = await Experience.find();
    res.json(experience);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
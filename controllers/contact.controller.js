const Contact = require('../models/contact.model');

exports.getContact = async (req, res) => {
  try {
    const contact = await Contact.findOne();
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    console.log('Received contact message:', { name, email, subject, message });
    res.status(200).json({ success: true, message: `Thank you ${name}! Your message has been received successfully.` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
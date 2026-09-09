const Contact = require('../models/contact.model');
const Message = require('../models/message.model');

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
    console.log('Received contact message from:', name, email);

    // Save message to MongoDB
    try {
      await Message.create({ name, email, subject, message });
      console.log('Message stored in MongoDB successfully');
    } catch (dbErr) {
      console.warn('Could not persist message to DB, proceeding with response:', dbErr.message);
    }

    return res.status(200).json({
      success: true,
      message: `Thank you ${name}! Your message has been received successfully.`
    });
  } catch (error) {
    console.error('Contact controller error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
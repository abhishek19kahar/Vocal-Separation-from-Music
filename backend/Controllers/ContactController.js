import ContactMessage from '../Models/contact.js';

// Handle form submissions
export const submitContactForm = async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    // Save the message to the database
    const contactMessage = new ContactMessage({ name, email, subject, message });
    await contactMessage.save();

    res.status(201).json({ message: 'Your message has been sent successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send the message.' });
  }
};

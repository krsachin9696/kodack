import * as createContactUsService from './contactUsServices.js';
import logger from '../../utils/logger.js';

export const createContactUs = async (req, res) => {
  const { name, email, subject, message } = req.body;
  try {
    const newContactForm = await createContactUsService({
      name,
      email,
      subject,
      message,
    });

    res.status(201).json({ message: 'Form submitted successfully', newContactForm });
  } catch (error) {
    logger.error('Error creating contact form:', error);
    res.status(500).json({ error: 'Failed to submit form' });
  }
};

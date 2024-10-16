import { contactUsSchema } from './contactUsValidation.js';
import * as contactUsService from './contactUsServices.js';
import logger from '../../utils/logger.js';

export const createContactUs = async (req, res) => {
  try {
    // Validate request body
    const { error } = contactUsSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { name, email, subject, message } = req.body;

    // Call service layer to handle creation logic
    const newContactForm = await contactUsService.createContactUsService({
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

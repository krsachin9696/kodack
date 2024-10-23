import * as contactUsServices from './contactUsServices.js';
import logger from '../../utils/logger.js';

export const createContactUs = async (req, res) => {
  const { name, email, subject, message } = req.body;
  try {
    const newContactForm = await contactUsServices.createContactUsService(
      name,
      email,
      subject,
      message
    );

    //201 used because request succeded and new resource was created as a result, generally used in post and put.
    res.status(201).json({ message: 'Form submitted successfully', newContactForm });
  } catch (error) {
    //error logged in log file
    logger.error('Error creating contact form:', error);
    //500 used becuse of internal error and server doesnt know to handle it
    res.status(500).json({ error: 'Failed to submit form' });
  }
};

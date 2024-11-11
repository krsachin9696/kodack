import * as contactUsRepository from './contactUsRepository.js';
import sendEmail from '../../utils/sendEmail.js';
import logger from '../../utils/logger.js';

export const createContactUsService = async (name, email, subject, message) => {
  //form entry in database
  const contactUsEntry = await contactUsRepository.createContactUs({
    name,
    email,
    subject,
    message,
  });

  //email to user
  const confirmationSubject = `Thank you for contacting us, ${name}`;
  const confirmationMessage = `Hello ${name},\n\nThank you for reaching out to us. We have received your message and will get back to you as soon as possible.\n\nBest Regards,\nKODACK`;

  //print success and error in log file not console
  try {
    await sendEmail(email, confirmationSubject, confirmationMessage);
    logger.info(`Confirmation email sent to ${email}`);
  } catch (error) {
    logger.error(`Error sending confirmation email: ${error.message}`);
  }

  return contactUsEntry;
};

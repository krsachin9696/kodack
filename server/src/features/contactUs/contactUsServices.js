import * as contactUsRepository from './contactUsRepository.js';
import sendEmail from '../../utils/sendEmail.js';  // import the sendEmail function

export const createContactUsService = async (data) => {
  const { name, email, subject, message } = data;

  // Create the contact form entry in the database
  const contactUsEntry = await contactUsRepository.createContactUs({
    name,
    email,
    subject,
    message,
  });

  // Send a confirmation email to the user
  const confirmationSubject = `Thank you for contacting us, ${name}`;
  const confirmationMessage = `Hello ${name},\n\nThank you for reaching out to us. We have received your message and will get back to you as soon as possible.\n\nBest Regards,\nKODACK`;

  try {
    await sendEmail(email, confirmationSubject, confirmationMessage);
    console.log(`Confirmation email sent to ${email}`);
  } catch (error) {
    console.error(`Error sending confirmation email: ${error.message}`);
  }

  return contactUsEntry;
};

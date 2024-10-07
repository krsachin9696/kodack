import prisma from '../../config/prismaClient';

const createContactUS = async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Input validation (simple validation)
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Store the form submission in the database
    const newContactForm = await prisma.contactForm.create({
      data: {
        name,
        email,
        subject,
        message,
      },
    });

    res
      .status(200)
      .json({ message: 'Form submitted successfully', data: newContactForm });
  } catch (error) {
    console.error('Error saving contact form:', error);
    res
      .status(500)
      .json({ error: 'Failed to submit the form. Please try again later.' });
  }
};

export { createContactUS };

import prisma from '../../config/prismaClient.js';

export const createContactUs = async (data) => {
  const { name, email, subject, message } = data;

  // Store the form submission in the database
  return await prisma.contactUs.create({
    data: { name, email, subject, message },
  });
};

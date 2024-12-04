import * as contactUsServices from './contactUsServices.js';
import asyncHandler from '../../utils/asyncHandler.js'; 

export const createContactUs = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;

  const newContactForm = await contactUsServices.createContactUsService(
    name,
    email,
    subject,
    message,
  );

  // 201 used because request succeeded and new resource was created as a result, generally used in post and put.
  res
    .status(201)
    .json({ message: 'Form submitted successfully', newContactForm });
});

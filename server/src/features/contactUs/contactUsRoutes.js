import { Router } from 'express';
import { createContactUs } from './contactUsControllers.js';
import validate from '../../middlewares/validationMiddleware.js';
import { contactUsSchema } from './contactUsValidation.js';

const contactUsRoute = Router();

contactUsRoute.post('/', validate(contactUsSchema), createContactUs);

export default contactUsRoute;

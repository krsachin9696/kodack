import { Router } from 'express';
import * as contactUsControllers from './contactUsControllers.js';
import validate from '../../middlewares/validationMiddleware.js';
import * as contactUsSchema from './contactUsSchema.js';

const contactUsRoute = Router();

contactUsRoute.post(
  '/',
  validate(contactUsSchema.contactUsSchemaValidation),
  contactUsControllers.createContactUs,
);

export default contactUsRoute;

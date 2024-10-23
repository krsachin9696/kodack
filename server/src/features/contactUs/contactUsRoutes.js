import { Router } from 'express';
import { createContactUs } from './contactUsControllers.js';

const contactUsRoute = Router();

contactUsRoute.post('/', createContactUs);

export default contactUsRoute;

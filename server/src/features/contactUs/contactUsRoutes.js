import { Router } from 'express';
import { createContactUS } from './contactUsControllers.js';

const contactUsRoute = Router();

contactUsRoute.post('/', createContactUS);

export default contactUsRoute;

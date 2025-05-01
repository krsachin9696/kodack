import { Router } from 'express';
import { getUserData } from './userControllers.js';
import isAuthenticated from '../../middlewares/authMiddleware.js';

const userRoute = Router();

userRoute.get('/', isAuthenticated, getUserData);

export default userRoute;

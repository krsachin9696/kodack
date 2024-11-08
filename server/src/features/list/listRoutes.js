import express from 'express';
import * as listControllers from './listControllers.js';
import * as listSchema from './listSchema.js';
import validate from '../../middlewares/validationMiddleware.js';

const listRoute = express.Router();

listRoute.post('/', validate(listSchema.createListSchema), listControllers.createList);
listRoute.get('/personal-lists', listControllers.getPersonalLists);
listRoute.get('/public-lists', listControllers.getPublicLists);
listRoute.post('/request-access', validate(listSchema.requestAccessSchema), listControllers.requestAccess);
listRoute.get('/access-requests', listControllers.viewAllAccessRequests);
listRoute.put('/grant-access', validate(listSchema.grantAccessSchema), listControllers.updateAccessStatus);
listRoute.get('/accessed-lists', listControllers.getAllAccessRequestedLists);

export default listRoute;

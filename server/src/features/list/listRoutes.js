import express from 'express';
import * as listController from './listControllers.js';
import * as listSchema from './listSchema.js'
import validate from '../../middlewares/validationMiddleware.js';

const listRoute = express.Router();

listRoute.post('/', validate(listSchema.listSchemaValidation), listController.createList);
listRoute.get('/', listController.getAllLists);
listRoute.put('/:id', listController.updateList);
listRoute.get('/user/:userID', listController.getListsByUserId);
listRoute.delete('/:id', listController.deleteList);
listRoute.get('/:listID', listController.getListDetails);

export default listRoute;

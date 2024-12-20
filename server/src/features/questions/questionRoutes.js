import express from 'express';
import * as questionController from './questionControllers.js';
import validate from '../../middlewares/validationMiddleware.js';
import {
  addQuestionSchema,
  updateQuestionStatusSchema,
} from './questionSchema.js';
import checkListAccess from '../list/listMiddlewares.js';

const questionRoute = express.Router();

questionRoute.post(
  '/add-question',
  validate(addQuestionSchema),
  questionController.addQuestion,
);
questionRoute.patch(
  '/:listID/:questionID',
  validate(updateQuestionStatusSchema),
  checkListAccess,
  questionController.updateQuestionStatus,
);
questionRoute.delete('/:listID/:questionID', questionController.deleteQuestion);
questionRoute.get('/:id', questionController.getQuestionDetails);

export default questionRoute;

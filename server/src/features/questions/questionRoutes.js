import express from 'express';
import * as questionController from './questionControllers.js';
import validate from '../../middlewares/validationMiddleware.js';
import {
  addQuestionSchema,
  updateQuestionStatusSchema,
} from './questionSchema.js';

const questionRoute = express.Router();

questionRoute.post(
  '/add-question',
  validate(addQuestionSchema),
  questionController.addQuestion,
);
questionRoute.patch(
  '/:listID/:questionID',
  validate(updateQuestionStatusSchema),
  questionController.updateQuestionStatus,
);
questionRoute.get('/:id', questionController.getQuestionDetails);

export default questionRoute;

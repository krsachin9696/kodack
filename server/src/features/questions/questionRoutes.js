import express from 'express';
import * as questionController from './questionControllers.js';

const questionRoute = express.Router();

questionRoute.post('/', questionController.createQuestion);
questionRoute.get('/', questionController.getAllQuestions);
questionRoute.put('/:id', questionController.updateQuestion);
questionRoute.delete('/:id', questionController.deleteQuestion);
questionRoute.get('/:id', questionController.getQuestionDetails);

export default questionRoute;

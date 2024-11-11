import logger from '../../utils/logger.js';
import * as questionService from './questionServices.js';

export const createQuestion = async (req, res) => {
  try {
    const { title, link, createdById, updatedById } = req.body;

    if (!title || !link) {
      return res.status(400).json({ error: 'Title and link are required' });
    }

    const newQuestion = await questionService.createQuestion({
      title,
      link,
      createdById,
      updatedById,
    });
    res.status(201).json(newQuestion);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: 'Failed to create question' });
  }
};

export const getAllQuestions = async (req, res) => {
  try {
    const questions = await questionService.getAllQuestions();
    res.status(200).json(questions);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: 'Failed to retrieve questions' });
  }
};

export const updateQuestion = async (req, res) => {
  try {
    const updatedQuestion = await questionService.updateQuestion(
      req.params.id,
      req.body,
    );
    res.status(200).json(updatedQuestion);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: 'Failed to update question' });
  }
};

export const deleteQuestion = async (req, res) => {
  try {
    await questionService.softDeleteQuestion(req.params.id);
    res.status(204).send();
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: 'Failed to delete question' });
  }
};

export const getQuestionDetails = async (req, res) => {
  try {
    const questionDetails = await questionService.getQuestionDetails(
      req.params.id,
    );
    res.status(200).json(questionDetails);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: 'Failed to retrieve question details' });
  }
};

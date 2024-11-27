import logger from '../../utils/logger.js';
import { validateListAndUser } from '../list/listRepository.js';
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

export const addQuestion = async (req, res) => {
  try {
    const { listID, title, link } = req.body;
    const userID = req.user.userID;

    const newQuestion = await questionService.addQuestionToListService(
      userID,
      listID,
      title,
      link,
    );

    res.status(200).json(newQuestion);
  } catch (error) {
    logger.error('error', error);
    res.status(500).json({ error: 'Failed to add question' });
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

export const updateQuestionStatus = async (req, res) => {
  const { listID, questionID } = req.params;
  const { done, important, review } = req.body;
  const userID = req.user.userID;

  try {
    // Validate that the user has access to the list and question
    await validateListAndUser(userID, listID);

    // Update the question status
    const updatedStatus = await questionService.updateQuestionStatus(
      userID,
      listID,
      questionID,
      { done, important, review }, // Pass all status flags at once
    );

    // Respond with the updated status
    res.status(200).json(updatedStatus);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: error.message || 'Failed to update question status' });
  }
};


export const deleteQuestion = async (req, res) => {
  const { listID, questionID } = req.params;
  const { userID } = req.user;
  
  try {
    // console.log(userID, 'user req')
    // const isowner = await validateListAndUser(userID, listID);

    // console.log(isowner, 'owner hai ya nahi');

    const deleteQuestion = await questionService.deleteQuestion(userID, listID, questionID);

    res.status(200).json(deleteQuestion);

  } catch (error) {
    console.log(error);
    res.status(500).json({message: 'Failed to delete the question'});
  }
}
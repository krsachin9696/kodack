import { validateListAndUser } from '../list/listRepository.js';
import * as questionService from './questionServices.js';
import asyncHandler from '../../utils/asyncHandler.js';

// Create Question
export const createQuestion = asyncHandler(async (req, res) => {
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
});

// Add Question to List
export const addQuestion = asyncHandler(async (req, res) => {
  const { listID, title, link } = req.body;
  const userID = req.user.userID;

  const newQuestion = await questionService.addQuestionToListService(
    userID,
    listID,
    title,
    link,
  );

  res.status(200).json(newQuestion);
});

// Get Question Details
export const getQuestionDetails = asyncHandler(async (req, res) => {
  const questionDetails = await questionService.getQuestionDetails(
    req.params.id,
  );
  
  res.status(200).json(questionDetails);
});

// Update Question Status
export const updateQuestionStatus = asyncHandler(async (req, res) => {
  const { listID, questionID } = req.params;
  const { done, important, review } = req.body;
  const userID = req.user.userID;

  // Validate that the user has access to the list and question
  await validateListAndUser(userID, listID);

  // Update the question status
  const updatedStatus = await questionService.updateQuestionStatus(
    userID,
    listID,
    questionID,
    { done, important, review },
  );

  // Respond with the updated status
  res.status(200).json(updatedStatus);
});

// Delete Question
export const deleteQuestion = asyncHandler(async (req, res) => {
  const { listID, questionID } = req.params;
  const userID = req.user.userID;

  const deleteQuestion = await questionService.deleteQuestion(
    userID,
    listID,
    questionID,
  );

  res.status(200).json(deleteQuestion);
});

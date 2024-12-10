import * as questionRepository from './questionRepository.js';
import * as listRepository from '../list/listRepository.js';
import { ApiError } from '../../utils/apiError.js';
import { logAuditTrail } from '../../utils/auditLogger.js';

export const createQuestion = async (data) => {
  return await questionRepository.createQuestion(data);
};

export const addQuestionToListService = async (userID, listID, title, link) => {
  // 1. Check if the question already exists in the Question table
  const existingQuestion = await questionRepository.findQuestionByLink(link);

  let questionID;
  let newQuestion;

  if (existingQuestion) {
    // 2. If the question exists, use the existing question's ID
    questionID = existingQuestion.questionID;
  } else {
    // 3. If the question doesn't exist, create a new question
    newQuestion = await questionRepository.createNewQuestion(
      title,
      link,
      userID,
    );
    questionID = newQuestion.questionID;
  }

  // 4. Connect the question to the list using the ListQuestion table
  await listRepository.createListQuestion(listID, questionID);

  logAuditTrail({
    actorID: userID,
    action: 'Create',
    tableName: 'Questions',
    recordId: questionID,
    newData: existingQuestion ? existingQuestion : newQuestion,
  });

  return {
    message: 'Question successfully added to the list.',
    questionId: questionID,
  };
};

export const getQuestionDetails = async (id) => {
  const question = await questionRepository.getQuestionDetails(id);

  if (!question) {
    throw new ApiError(404, 'Question not found');
  }

  return question;
};

export const updateQuestionStatus = async (
  userID,
  listID,
  questionID,
  { done, important, review },
) => {
  // Update or create the question status
  return await questionRepository.updateUserQuestionStatus(
    userID,
    listID,
    questionID,
    { done, important, review },
  );
};

export const deleteQuestion = async (userID, listID, questionID) => {
  const listOwner = await listRepository.validateListAndUser(userID, listID);

  if (listOwner.userID != userID) {
    throw new ApiError(403, 'You do not have access to delete this question');
  }

  const deletedQuestion = await questionRepository.deleteQuestion(
    listID,
    questionID,
  );

  logAuditTrail({
    actorID: userID,
    action: 'Delete',
    tableName: 'Questions',
    recordId: questionID,
    newData: deletedQuestion,
  });

  return deletedQuestion;
};

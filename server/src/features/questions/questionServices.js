import * as questionRepository from './questionRepository.js';
import * as listRepository from '../list/listRepository.js';

export const createQuestion = async (data) => {
  return await questionRepository.createQuestion(data);
};

export const addQuestionToListService = async (userID, listID, title, link) => {
  // 1. Check if the question already exists in the Question table
  const existingQuestion = await questionRepository.findQuestionByLink(link);

  let questionID;

  if (existingQuestion) {
    // 2. If the question exists, use the existing question's ID
    questionID = existingQuestion.questionID;
  } else {
    // 3. If the question doesn't exist, create a new question
    const newQuestion = await questionRepository.createNewQuestion(
      title,
      link,
      userID,
    );
    questionID = newQuestion.questionID;
  }

  // 4. Connect the question to the list using the ListQuestion table
  await listRepository.createListQuestion(listID, questionID);

  return {
    message: 'Question successfully added to the list.',
    questionId: questionID,
  };
};

export const getQuestionDetails = async (id) => {
  return await questionRepository.getQuestionDetails(id);
};

export const updateQuestionStatus = async (
  userID,
  listID,
  questionID,
  { done, important, review },
) => {
  // Validate that the user has access to the list
  await listRepository.validateListAndUser(userID, listID);

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
    throw new Error({
      message: 'you do not have access to delete this question',
    });
  }

  return await questionRepository.deleteQuestion(listID, questionID);
};

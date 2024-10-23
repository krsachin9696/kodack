import * as questionRepository from './questionRepository.js';

export const createQuestion = async (data) => {
  return await questionRepository.createQuestion(data);
};

export const getAllQuestions = async () => {
  return await questionRepository.getAllQuestions();
};

export const updateQuestion = async (id, data) => {
  return await questionRepository.updateQuestion(id, data);
};

export const softDeleteQuestion = async (id) => {
  return await questionRepository.softDeleteQuestion(id);
};

export const getQuestionDetails = async (id) => {
  return await questionRepository.getQuestionDetails(id);
};

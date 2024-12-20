import prisma from '../../config/prismaClient.js';

export const createQuestion = async (data) => {
  return await prisma.question.create({
    data: {
      title: data.title,
      link: data.link,
      createdById: data.createdById,
      updatedById: data.updatedById,
    },
  });
};

export const findQuestionByLink = async (link) => {
  return await prisma.question.findFirst({
    where: { link },
  });
};

export const createNewQuestion = async (title, link, userID) => {
  return await prisma.question.create({
    data: {
      title,
      link,
      createdBy: {
        connect: { userID: userID },
      },
      updatedBy: {
        connect: { userID: userID },
      },
    },
  });
};

export const getQuestionDetails = async (id) => {
  return await prisma.question.findUnique({
    where: { questionID: id },
  });
};

export const validateQuestion = async (questionID) => {
  const question = await prisma.question.findUnique({
    where: { questionID },
  });

  if (!question) {
    throw new Error('Question not found');
  }
};

export const updateUserQuestionStatus = async (
  userID,
  listID,
  questionID,
  { done, important, review },
) => {
  return await prisma.userQuestionStatus.upsert({
    where: {
      userID_listID_questionID: {
        userID,
        listID,
        questionID,
      },
    },
    update: {
      ...(done !== undefined && { done }),
      ...(important !== undefined && { important }),
      ...(review !== undefined && { review }),
    },
    create: {
      user: { connect: { userID } },
      list: { connect: { listID } },
      question: { connect: { questionID } },
      createdBy: { connect: { userID } },
      updatedBy: { connect: { userID } },
      done: done || false,
      important: important || false,
      review: review || false,
    },
  });
};

export const deleteQuestion = async (listID, questionID) => {
  return await prisma.listQuestion.update({
    where: {
      listID_questionID: {
        listID,
        questionID,
      },
    },
    data: { isDeleted: true },
  });
};

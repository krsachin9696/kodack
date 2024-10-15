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

export const getAllQuestions = async () => {
  return await prisma.question.findMany();
};

export const updateQuestion = async (id, data) => {
  return await prisma.question.update({
    where: { questionID: id },
    data,
  });
};

export const softDeleteQuestion = async (id) => {
  return await prisma.question.update({
    where: { questionID: id },
    data: { isDeleted: true },
  });
};

export const getQuestionDetails = async (id) => {
  return await prisma.question.findUnique({
    where: { questionID: id },
  });
};

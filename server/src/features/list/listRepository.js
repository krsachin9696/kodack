import prisma from '../../config/prismaClient.js';

export const findListByNameAndUser = async (userID, name) => {
  return await prisma.list.findFirst({
    where: { 
      AND: [
        { name }, 
        { userID }
      ] 
    },
  });
};

export const createList = async (userID, name, description, isPublic, tags) => {
  // Split tags into newTags and existingTags
  const existingTags = await prisma.tag.findMany({
    where: { name: { in: tags } },
  });

  const existingTagNames = existingTags.map(tag => tag.name);
  const newTagNames = tags.filter(tag => !existingTagNames.includes(tag));

  // Create new tags
  const newTags = await Promise.all(
    newTagNames.map(tagName =>
      prisma.tag.create({
        data: { name: tagName },
      })
    )
  );

  // Combine existing tags and newly created tags
  const allTags = [...existingTags, ...newTags];

  // Create the list and connect the tags
  const newList = await prisma.list.create({
    data: {
      name,
      description,
      isPublic,
      isDeleted: false,
      user: {
        connect: { userID: userID },
      },
      createdBy: {
        connect: { userID: userID },
      },
      updatedBy: {
        connect: { userID: userID },
      },
      tags: {
        connect: allTags.map(tag => ({ id: tag.id })),
      },
    },
  });

  return newList;
};

export const getListsByUserId = async (userId) => {
  return await prisma.list.findMany({
    where: {
      userID: userId,
      isDeleted: false,
    },
    select: {
      listID: true,
      name: true,
    },
  });
};


export const getAllLists = async () => {
  return await prisma.list.findMany({ where: { isDeleted: false } });
};

export const updateList = async (id, data) => {
  return await prisma.list.update({
    where: {
      listID: id,
    },
    data,
  });
};

export const softDeleteList = async (id) => {
  return await prisma.list.update({
    where: { listID: id },
    data: { isDeleted: true },
  });
};

export const getListDetailsRepository = async (
  listID,
  userID,
  { page, limit },
) => {
  const skip = (page - 1) * limit;

  const listDetails = await prisma.list.findUnique({
    where: { listID },
    include: {
      user: {
        select: {
          userID: true,
          name: true,
        },
      },
      createdBy: {
        select: {
          userID: true,
          name: true,
        },
      },
      updatedBy: {
        select: {
          userID: true,
          name: true,
        },
      },
      questions: {
        skip,
        take: limit,
        where: { isDeleted: false },
        include: {
          question: true,
          userQuestionStatuses: {
            where: { userID },
          },
        },
      },
      UserQuestionStatus: {
        where: { userID },
      },
    },
  });

  const totalQuestionsCount = await prisma.listQuestion.count({
    where: {
      listID,
      isDeleted: false,
    },
  });

  return {
    listDetails,
    pagination: {
      currentPage: page,
      pageSize: limit,
      totalItems: totalQuestionsCount,
      totalPages: Math.ceil(totalQuestionsCount / limit),
    },
  };
};

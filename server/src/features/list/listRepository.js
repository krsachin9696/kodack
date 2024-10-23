import prisma from '../../config/prismaClient.js';

export const findListByNameAndUser = async (userID, name) => {
  return await prisma.list.findFirst({
    where: { OR: [{ name }, { userID }] },
  });
};

export const createList = async (userID, name, description, isPublic, tags) => {
  

  // const listData = {
  //   name,
  //   description,
  //   isPublic,
  //   isDeleted: false,
  //   userID,
  //   createdById: userID,
  //   updatedById: userID,
  //   tags: {
  //     create: newTags.map((tagName) => ({
  //       tag: {
  //         create: { name: tagName }, // Create new tags
  //       },
  //     })),
  //     connect: existingTags.map((tagID) => ({ tagID })),
  //   },
  // };

  const newList = await prisma.list.create({
    data: {
      name: name,
      description: description,
      isPublic: true,
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
      // tags: {
      //   connect: [{ id: "tag-id-1" }, { id: "tag-id-2" }], // Optionally connect tags
      // },
    },
  });
  
  return newList
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

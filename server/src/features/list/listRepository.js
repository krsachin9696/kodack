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

export const findExistingTags = async (tags) => {
  return await prisma.tag.findMany({
    where: { name: { in: tags } },
  });
}

export const createNewTag = async (tagName) => {
  return await prisma.tag.create({
    data: { name: tagName },
  })
}


export const createList = async (userID, name, description, isPublic, allTags) => {

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

export const getListsByUserId = async (userId, page = 1, limit = 10) => {

  const skip = (page-1) * limit;

  const lists = await prisma.list.findMany({
    where: {
      userID: userId,
      isDeleted: false,
    },
    select: {
      listID: true,
      name: true,
      tags: {
        select: {
          name: true
        }
      },
      isPublic: true
    },
    skip,
    take: limit,
    orderBy: {
      createdAt: 'desc'
    }
  });

  const totalItems = await prisma.list.count({
    where: {
      userID: userId,
      isDeleted: false,
    }
  });

  return { lists, totalItems };
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

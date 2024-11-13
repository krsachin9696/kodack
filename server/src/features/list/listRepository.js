import prisma from '../../config/prismaClient.js';
import { AccessStatus } from '@prisma/client';

export const findListByNameAndUser = async (userID, name) => {
  return await prisma.list.findFirst({
    where: {
      AND: [{ name }, { userID }],
    },
  });
};

export const findExistingTags = async (tags) => {
  return await prisma.tag.findMany({
    where: { name: { in: tags } },
  });
};

export const createNewTag = async (tagName) => {
  return await prisma.tag.create({
    data: { name: tagName },
  });
};

export const createList = async (
  userID,
  name,
  description,
  isPublic,
  allTags,
) => {
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
        connect: allTags.map((tag) => ({ id: tag.id })),
      },
    },
  });

  return newList;
};

export const getListsByUserId = async (userID, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const lists = await prisma.list.findMany({
    where: {
      userID: userID,
      isDeleted: false,
    },
    select: {
      listID: true,
      name: true,
      tags: {
        select: {
          name: true,
        },
      },
      isPublic: true,
    },
    skip,
    take: limit,
    orderBy: {
      createdAt: 'desc',
    },
  });

  const totalItems = await prisma.list.count({
    where: {
      userID: userID,
      isDeleted: false,
    },
  });

  return { lists, totalItems };
};

export const getAllPublicLists = async (
  userID,
  searchTerm,
  page = 1,
  limit = 10,
) => {
  const skip = (page - 1) * limit;

  const lists = await prisma.list.findMany({
    where: {
      isPublic: true,
      userID: { not: userID },
      OR: [
        {
          name: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        },
        {
          tags: {
            some: {
              name: {
                contains: searchTerm,
                mode: 'insensitive',
              },
            },
          },
        },
      ],
    },
    select: {
      listID: true,
      name: true,
      tags: {
        select: {
          name: true,
        },
      },
      user: {
        select: {
          name: true,
        },
      },
      accessRequest: {
        where: {
          userID,
        },
        select: {
          status: true,
        },
      },
    },
    skip,
    take: limit,
    orderBy: {
      createdAt: 'desc',
    },
  });

  const totalItems = await prisma.list.count({
    where: {
      isPublic: true,
      userID: { not: userID },
      name: {
        contains: searchTerm,
        mode: 'insensitive',
      },
    },
  });

  return { lists, totalItems };
};

export const findExistingRequest = async (userID, listID) => {
  return await prisma.accessRequest.findFirst({
    where: {
      userID,
      listID,
    },
    select: {
      status: true,
    },
  });
};

export const createNewAccessRequest = async (userID, listID) => {
  return await prisma.accessRequest.create({
    data: {
      userID,
      listID,
      status: AccessStatus.PENDING,
    },
  });
};

export const getListsByOwnerID = async (userID) => {
  return await prisma.list.findMany({
    where: { userID: userID },
    select: { listID: true },
  });
};

export const getPendingRequestsForLists = async (listIDs) => {
  return await prisma.accessRequest.findMany({
    where: {
      listID: { in: listIDs },
      status: AccessStatus.PENDING,
    },
    select: {
      userID: true, // ID of the user who requested access
      listID: true, // ID of the list for which access is requested
      createdAt: true, // Timestamp for when the request was made
    },
  });
};

export const updateAccessRequestStatus = async (userID, listID, status) => {
  return await prisma.accessRequest.update({
    where: {
      userID_listID: { userID, listID }, // Composite unique constraint
    },
    data: { status },
  });
};

export const getAllAccessRequestedLists = async (
  userID,
  page = 1,
  limit = 10,
) => {
  const skip = (page - 1) * limit;

  const accessRequestList = await prisma.accessRequest.findMany({
    where: {
      userID,
    },
    include: {
      list: {
        include: {
          user: {
            select: {
              name: true,
            },
          },
          tags: {
            select: {
              name: true,
            },
          },
          accessRequest: {
            where: {
              userID,
            },
            select: {
              status: true,
            },
          },
        },
      },
    },
    skip,
    take: limit,
    orderBy: {
      createdAt: 'desc',
    },
  });

  const lists = accessRequestList.map((request) => ({
    ...request.list,
  }));

  const totalItems = await prisma.accessRequest.count({
    where: {
      userID,
    },
  });

  return { lists, totalItems };
};

export const getListByIdWithTags = async (listID) => {
  return await prisma.list.findUnique({
    where: { listID },
    select: {
      listID: true,
      name: true,
      description: true,
      tags: {
        select: {
          name: true,
        },
      },
    },
  });
};

export const getAccessRequestsForList = async (listID) => {
  return await prisma.accessRequest.findMany({
    where: {
      listID: listID,
    },
    include: {
      user: {
        select: {
          userID: true,
          name: true,
        },
      },
    },
  });
};

export const getQuestionsForList = async (listID, userID) => {
  // Fetch questions from the list along with their status for the user
  const listQuestions = await prisma.listQuestion.findMany({
    where: { listID },
    include: {
      question: {
        select: {
          questionID: true,
          title: true,
          link: true,
        },
      },
    },
  });

  // Fetch user-specific statuses for all questions in the list
  const questionIDs = listQuestions.map((item) => item.questionID);

  const statuses = await prisma.userQuestionStatus.findMany({
    where: {
      userID,
      listID,
      questionID: { in: questionIDs },
    },
    select: {
      questionID: true,
      done: true,
      important: true,
      review: true,
    },
  });

  // Map statuses by questionID for easy lookup
  const statusMap = statuses.reduce((acc, status) => {
    acc[status.questionID] = status;
    return acc;
  }, {});

  // Combine questions with their statuses
  return listQuestions.map((item) => ({
    questionID: item.questionID,
    title: item.question.title,
    leetcodeLink: item.question.link,
    status: statusMap[item.questionID] || {
      done: false,
      important: false,
      review: false,
    },
  }));
};

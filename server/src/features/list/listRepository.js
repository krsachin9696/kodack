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

export const getListsByUserId = async (userID, page = 1, limit = 10) => {

  const skip = (page-1) * limit;

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
      userID: userID,
      isDeleted: false,
    }
  });

  return { lists, totalItems };
};

export const getListsByOwnerID = async (userID) => {
  return await prisma.list.findMany({
    where: { userID: userID },
    select: { listID: true },
  });
};

export const getAllPublicLists = async (userID, searchTerm, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const lists = await prisma.list.findMany({
    where: {
      isPublic: true,
      userID: { not: userID },
      name: {
        contains: searchTerm,
        mode: 'insensitive',
      },
    },
    select: {
      listID: true,
      name: true,
      tags: {
        select: {
          name: true,
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
      listID
  },
});
};

export const createNewAccessRequest = async (userID, listID) => {
  return await prisma.accessRequest.create({
    data: {
      userID,
      listID,
      status: "PENDING",
    },
  });
};

export const getPendingRequestsForLists = async (listIDs) => {
  return await prisma.accessRequest.findMany({
    where: {
      listID: { in: listIDs },
      status: "PENDING"
    },
    select: {
      userID: true,    // ID of the user who requested access
      listID: true,    // ID of the list for which access is requested
      createdAt: true, // Timestamp for when the request was made
    },
  });
};

export const findAlreadyGrantedRequest = async (userID, listID) => {
  return await prisma.listAccess.findFirst({
    where: {
      userID,
      listID,
      hasAccess: true
    },
  });
}

export const createGrantedAccess = async (userID, listID) => {
  return await prisma.listAccess.create({
    data: {
      userID,
      listID,
      hasAccess: true,
    },
  });
}

export const updateAccessRequestStatus = async (userID, listID) => {
  return await prisma.accessRequest.update({
    where: {userID, listID },
    data: { status: "GRANTED" },
  });
}

// Fetch public lists user has access to
export const getAccessiblePublicLists = async (userID, searchTerm, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const lists = await prisma.list.findMany({
    where: {
      isPublic: true,
      listAccess: {
        some: {
          userID: userID,
          hasAccess: true,
        },
      },
      name: {
        contains: searchTerm,
        mode: 'insensitive',
      },
    },
    select: {
      listID: true,
      name: true,
      tags: {
        select: {
          name: true,
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
      listAccess: {
        some: {
          userID: userID,
          hasAccess: true,
        },
      },
      name: {
        contains: searchTerm,
        mode: 'insensitive',
      },
    },
  });

  return { lists, totalItems };
};



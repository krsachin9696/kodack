// import prisma from '../../config/prismaClient.js';

// export const createList = async (data) => {
//   const { userID, name, visibility = 1, isDeleted = false, tags = [] } = data;

//   const listData = {
//     name,
//     visibility,
//     isDeleted,
//     userID,
//     tags: {
//       create: tags.map((tag) => ({ tag: { connect: { id: tag } } })),
//     },
//     createdById: userID,
//     updatedById: userID,
//   };

//   return await prisma.list.create({
//     data: listData,
//   });
// };

// import { v4 as uuidv4, validate as validateUUID } from 'uuid';
// import prisma from '../../config/prismaClient.js';

// export const createList = async (data) => {
//   const { userID, name, visibility = 1, isDeleted = false, tags = [] } = data;

//   // Validate UUID for userID
//   if (!validateUUID(userID)) {
//     throw new Error("Invalid UUID for userID");
//   }

//   // Filter valid UUIDs for tags
//   const validTags = tags.filter(tag => validateUUID(tag));
//   if (validTags.length !== tags.length) {
//     console.warn("Some tags have invalid UUIDs and were filtered out.");
//   }

//   const listData = {
//     name,
//     visibility,
//     isDeleted,
//     userID,
//     tags: {
//       create: validTags.map((tag) => ({ tag: { connect: { id: tag } } })),
//     },
//     createdById: userID,
//     updatedById: userID,
//   };

//   try {
//     // Create the list and return the result
//     const createdList = await prisma.list.create({
//       data: listData,
//       include: {
//         tags: true,  // Optionally include tags in the response
//       },
//     });
//     return createdList;
//   } catch (error) {
//     console.error("Error creating list:", error);
//     throw new Error("Failed to create the list. Please try again.");
//   }
// };

// import prisma from '../../config/prismaClient.js';
// import { validate as validateUUID } from 'uuid';

// export const findListByNameAndUser = async (name, userID) => {
//   return await prisma.list.findFirst({
//     where: {
//       name,
//       userID,
//       isDeleted: false, // Ensure not deleted
//     },
//   });
// };

import { validate as validateUUID } from 'uuid';

export const findListByNameAndUser = async (name, userID) => {
  // Validate UUID for userID
  if (!validateUUID(userID)) {
    throw new Error(`Invalid UUID for userID: ${userID}`);
  }

  // Validate name
  if (typeof name !== 'string' || name.trim().length === 0) {
    throw new Error(`Invalid name provided: ${name}`);
  }

  // Log the values before the database query
  console.log('Finding list with name:', name, 'and userID:', userID);

  return await prisma.list.findFirst({
    where: {
      name,
      userID,
      isDeleted: false, // Ensure not deleted
    },
  });
};


export const createList = async (data) => {
  const { userID, name, visibility = 1, isDeleted = false, tags = [] } = data;

  // Validate UUID for userID
  if (!validateUUID(userID)) {
    throw new Error("Invalid UUID for userID");
  }

  // Validate name (you might want to check its type or length, depending on your requirements)
  if (typeof name !== 'string' || name.trim().length === 0) {
    throw new Error("Invalid name provided");
  }

  // Separate tags based on whether they are new or existing UUIDs
  const existingTags = tags.filter(tag => validateUUID(tag));
  const newTags = tags.filter(tag => !validateUUID(tag)); // Assuming non-UUID means it's a new tag name

  const listData = {
    name,
    visibility,
    isDeleted,
    userID,
    createdById: userID,
    updatedById: userID,
    tags: {
      create: newTags.map(tagName => ({
        tag: {
          create: { name: tagName }, // Create new tags
        }
      })),
      connect: existingTags.map(tagID => ({ tagID })), // Connect existing tags by ID
    },
  };

  try {
    console.log('Creating list with data:', listData); // Debugging log
    const createdList = await prisma.list.create({
      data: listData,
      include: {
        tags: {
          include: {
            tag: true, // Include tag details in the result
          },
        },
      },
    });
    return createdList;
  } catch (error) {
    console.error("Error creating list:", error);
    throw new Error("Failed to create the list. Please try again.");
  }
};


// export const createList = async (data) => {
//   const { userID, name, visibility = 1, isDeleted = false, tags = [] } = data;

//   // Validate UUID for userID
//   if (!validateUUID(userID)) {
//     throw new Error("Invalid UUID for userID");
//   }

//   // Separate tags based on whether they are new or existing UUIDs
//   const existingTags = tags.filter(tag => validateUUID(tag));
//   const newTags = tags.filter(tag => !validateUUID(tag)); // assuming non-UUID means it's a new tag name

//   const listData = {
//     name,
//     visibility,
//     isDeleted,
//     userID,
//     createdById: userID,
//     updatedById: userID,
//     tags: {
//       create: newTags.map(tagName => ({
//         tag: {
//           create: { name: tagName }, // Create new tags
//         }
//       })),
//       connect: existingTags.map(tagID => ({ tagID })), // Connect existing tags by ID
//     },
//   };

//   try {
//     const createdList = await prisma.list.create({
//       data: listData,
//       include: {
//         tags: {
//           include: {
//             tag: true, // Include tag details in the result
//           },
//         },
//       },
//     });
//     return createdList;
//   } catch (error) {
//     console.error("Error creating list:", error);
//     throw new Error("Failed to create the list. Please try again.");
//   }
// };



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

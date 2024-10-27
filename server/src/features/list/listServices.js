import { AccessStatus } from '@prisma/client';
import * as listRepository from './listRepository.js';

export const createListService = async (
  userID,
  name,
  description,
  isPublic,
  tags,
) => {
  const existingList = await listRepository.findListByNameAndUser(userID, name);
  if (existingList) {
    throw new Error('List name already exists for this user.');
  }

  const existingTags = await listRepository.findExistingTags(tags);
  const existingTagNames = existingTags.map((tag) => tag.name);
  const newTagNames = tags.filter((tag) => !existingTagNames.includes(tag));
  const newTags = await Promise.all(
    newTagNames.map((tagName) => listRepository.createNewTag(tagName)),
  );
  const allTags = [...existingTags, ...newTags];

  return await listRepository.createList(
    userID,
    name,
    description,
    isPublic,
    allTags,
  );
};

export const getPersonalListsService = async (userID, page = 1, limit = 10) => {
  const { lists, totalItems } = await listRepository.getListsByUserId(
    userID,
    page,
    limit,
  );

  const totalPages = Math.ceil(totalItems / limit); //roundooff

  return {
    lists: lists.map((list) => ({
      listID: list.listID,
      name: list.name,
      tags: list.tags.map((tag) => tag.name),
      isPublic: list.isPublic,
    })),
    totalItems,
    totalPages,
    currentPage: page,
  };
};

export const getAllPublicListsService = async (
  userID,
  searchTerm,
  page = 1,
  limit = 10,
) => {
  const { lists, totalItems } = await listRepository.getAllPublicLists(
    userID,
    searchTerm,
    page,
    limit,
  );

  const totalPages = Math.ceil(totalItems / limit);

  return {
    lists: lists.map((list) => ({
      listID: list.listID,
      name: list.name,
      tags: list.tags.map((tag) => tag.name),
      owner: list.user?.name,
      isPublic: list.isPublic,
      accessStatus: list.accessRequest.status || null,
    })),
    totalItems,
    totalPages,
    currentPage: page,
  };
};

export const requestAccessService = async (userID, listID) => {
  const existingAccess = await listRepository.findExistingRequest(
    userID,
    listID,
  );

  console.log(existingAccess, "akjdajajsf")

  if (existingAccess && existingAccess.status === AccessStatus.APPROVED) {
    throw new Error('Access already requested');
  }

  return await listRepository.createNewAccessRequest(userID, listID);
};

export const getAllAccessRequestedListsService = async (
  userID,
  page = 1,
  limit = 10,
) => {
  const { lists, totalItems } = await listRepository.getAllAccessRequestedLists(
    userID,
    page,
    limit,
  );

  const totalPages = Math.ceil(totalItems / limit);

  return {
    lists,
    totalItems,
    totalPages,
    currentPage: page,
  };
};

export const viewAllAccessRequestsService = async (userID) => {
  const lists = await listRepository.getListsByOwnerID(userID);
  const listIDs = lists.map((list) => list.listID);

  return await listRepository.getPendingRequestsForLists(listIDs);
};

export const updateAccessStatusService = async (userID, listID, status) => {
  const existingAccess = await listRepository.findExistingRequest(
    userID,
    listID,
  );

  if (existingAccess.status === 'APPROVED') {
    throw new Error('Access already granted to this user.');
  }

  const access = await listRepository.updateAccessRequestStatus(
    userID,
    listID,
    status,
  );

  return access.status;
};

// Fetch public lists the user has access to
export const getAccessiblePublicListsService = async (
  userID,
  searchTerm,
  page = 1,
  limit = 10,
) => {
  const { lists, totalItems } = await listRepository.getAccessiblePublicLists(
    userID,
    searchTerm,
    page,
    limit,
  );

  const totalPages = Math.ceil(totalItems / limit);

  return {
    lists: lists.map((list) => ({
      listID: list.listID,
      name: list.name,
      tags: list.tags.map((tag) => tag.name),
      isPublic: list.isPublic,
    })),
    totalItems,
    totalPages,
    currentPage: page,
  };
};

// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

// prisma.$use(async (params, next) => {
//   // Check if the update action is on the Access model
//   if (params.model === 'Access' && params.action === 'update') {
//     const { where, data } = params.args;

//     // If `hasAccess` is being set to false, delete the record
//     if (data.hasAccess === false) {
//       return await prisma.access.delete({
//         where,
//       });
//     }
//   }

//   // Proceed with the original action if hasAccess remains true
//   return next(params);
// });

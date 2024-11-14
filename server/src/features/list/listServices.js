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

const getTagIDToConnect = async (tags) => {
  const existingTags = await listRepository.findExistingTags(tags);
  const existingTagNames = existingTags.map((tag) => tag.name);
  const newTagNames = tags.filter((tag) => !existingTagNames.includes(tag));
  const newTags = await Promise.all(
    newTagNames.map((tagName) => listRepository.createNewTag(tagName)),
  );
  const allTags = [...existingTags, ...newTags];

  return allTags;
};

export const updateListService = async (
  listID,
  userID,
  name,
  description,
  isPublic,
  tags,
) => {
  const existingList = await listRepository.findListByIdAndUser(listID, userID);
  if (!existingList) {
    throw new Error('List not found');
  }

  const existingTags = existingList.tags || [];
  const existingTagNames = existingTags.map((tag) => tag.name);
  const incomingTagNames = tags ? tags.map((tag) => tag.name) : [];

  // const tagsToKeep = existingTags.filter(tag => incomingTagNames.includes(tag.name));

  const tagsToDisconnect = existingTags.filter(
    (tag) => !incomingTagNames.includes(tag.name),
  );
  const tagsNameToConnect = tags
    ? tags.filter((tag) => !existingTagNames.includes(tag.name))
    : [];

  const tagsIdToConnect = await getTagIDToConnect(tagsNameToConnect);

  const updatedList = await listRepository.updateList(
    listID,
    name,
    description,
    isPublic,
    {
      disconnect: tagsToDisconnect,
      connect: tagsIdToConnect,
    },
  );

  return updatedList;
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
      accessStatus: list.accessRequest?.[0]?.status || null,
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

  if (existingAccess) {
    throw new Error('Access already requested');
  }

  return await listRepository.createNewAccessRequest(userID, listID);
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
    lists: lists.map((list) => ({
      listID: list.listID,
      name: list.name,
      tags: list.tags.map((tag) => tag.name),
      owner: list.user?.name,
      isPublic: list.isPublic,
      accessStatus: list.accessRequest?.[0]?.status || null,
    })),
    totalItems,
    totalPages,
    currentPage: page,
  };
};

export const getListDetailsService = async (listID) => {
  // Fetch the list by its ID, including related tags
  const list = await listRepository.getListByIdWithTags(listID);

  if (!list) {
    throw new Error('List not found');
  }

  // Format the response according to the API spec
  return {
    listId: list.listID,
    listName: list.name,
    description: list.description,
    tags: list.tags.map((tag) => tag.name), // Extract tag names
  };
};

export const getAccessRequestsForListService = async (listID) => {
  // Query for the access requests for the specified list
  const accessRequests = await listRepository.getAccessRequestsForList(listID);

  return accessRequests;
};

export const getQuestionsForListService = async (listID, userID) => {
  // Query the repository for questions and statuses
  const questions = await listRepository.getQuestionsForList(listID, userID);
  return questions;
};

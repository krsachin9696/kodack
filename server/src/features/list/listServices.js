import * as listRepository from './listRepository.js'

export const createListService = async (userID, name, description, isPublic, tags) => {

  const existingList = await listRepository.findListByNameAndUser(userID, name);
  if (existingList) {
    throw new Error('List name already exists for this user.');
  }

  const existingTags = await listRepository.findExistingTags(tags);
  const existingTagNames = existingTags.map(tag => tag.name);
  const newTagNames = tags.filter(tag => !existingTagNames.includes(tag));
  const newTags = await Promise.all(newTagNames.map(tagName => listRepository.createNewTag(tagName)));
  const allTags = [...existingTags, ...newTags];

  return await listRepository.createList(userID, name, description, isPublic, allTags);
};

export const getPersonalListsService = async (userId, page = 1, limit = 10) => {
  const { lists, totalItems } = await listRepository.getListsByUserId(userId, page, limit);

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

export const getAllLists = async () => {
  return await listRepository.getAllLists();
};

export const updateList = async (id, data) => {
  return await listRepository.updateList(id, data);
};

export const softDeleteList = async (id) => {
  return await listRepository.softDeleteList(id);
};


export const getListDetails = async (listID, userID, { page, limit }) => {
  return await listRepository.getListDetailsRepository(listID, userID, {
    page,
    limit,
  });
};

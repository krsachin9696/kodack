import * as listRepository from './listRepository.js'

export const createListService = async (userID, name, description, isPublic, tags) => {

  const existingList = await listRepository.findListByNameAndUser(userID, name);
  if (existingList) {
    throw new Error('List name already exists for this user.');
  }
  
  return await listRepository.createList(userID, name, description, isPublic, tags);
};

export const getPersonalListsByUserIdService = async (userId) => {
  return await listRepository.getListsByUserId(userId);
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

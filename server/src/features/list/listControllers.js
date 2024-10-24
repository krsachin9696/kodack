import logger from '../../utils/logger.js';
import * as listServices from './listServices.js';

export const createList = async (req, res) => {
  try {
    const { name, isPublic, description, tags} = req.body;
    const userID = req.user.userID;

    const newList = await listServices.createListService(
      userID,
      name,
      description,
      isPublic,
      tags,
    );
    //201 is used because request was a success and a new resource is created as a result
    res.status(201).json(newList);
  } catch (error) {
    logger.error('error',error);
    //500 is used because of internal server error that server cant handle
    res.status(500).json({ error: 'Failed to create list' });
  }
};

export const getPersonalLists = async (req, res) => {
  try {
    const userID = req.user.userID;
    const page = parseInt(req.query.page) || 1;  // Default to page 1 if not provided
    const limit = parseInt(req.query.limit) || 10;  // Default to limit 10 if not provided
    const result = await listServices.getPersonalListsService(userID, page, limit);
    
    //200 is used for transmitting result of action to message body
    res.status(200).json(result);
  } catch (error) {
    logger.error('error', error);
    res.status(500).json({ error: 'Failed to retrieve lists' });
  }
};


export const getAllLists = async (req, res) => {
  try {
    const lists = await listService.getAllLists();
    res.status(200).json(lists);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: 'Failed to retrieve lists' });
  }
};

export const updateList = async (req, res) => {
  try {
    const updatedList = await listService.updateList(req.params.id, req.body);
    res.status(200).json(updatedList);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: 'Failed to update list' });
  }
};

export const deleteList = async (req, res) => {
  try {
    await listService.softDeleteList(req.params.id);
    res.status(204).send();
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: 'Failed to delete list' });
  }
};


export const getListDetails = async (req, res) => {
  try {
    const { listID } = req.params;
    const { userID } = req.header;

    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;

    if (!userID) {
      return res
        .status(400)
        .json({ error: 'userID query parameter is required' });
    }

    const { listDetails, pagination } = await listService.getListDetails(
      listID,
      userID,
      { page, limit },
    );
    res.status(200).json({ listDetails, pagination });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: 'Failed to retrieve list details' });
  }
};

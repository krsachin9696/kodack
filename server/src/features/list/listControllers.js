import logger from '../../utils/logger.js';
import * as listServices from './listServices.js';

export const createList = async (req, res) => {
  try {
    const { name, isPublic, isDeleted, tags} = req.body;

    const newList = await listServices.createListService(
      name,
      isPublic,
      tags,
      description
    );
    //201 is used because request was a success and a new resource is created as a result
    res.status(201).json(newList);
  } catch (error) {
    logger.error("error creating list", error);
    //500 is used because of internal server error that server cant handle
    res.status(500).json({ error: 'Failed to create list' });
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

export const getListsByUserId = async (req, res) => {
  try {
    const lists = await listService.getListsByUserId(req.params.userID);
    res.status(200).json(lists);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: 'Failed to retrieve lists' });
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

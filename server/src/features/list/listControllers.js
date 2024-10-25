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

export const getPublicLists = async (req, res) => {
  try {
    const userID = req.user.userID;
    const searchTerm = req.query.search || '';
    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 10;

    const result = await listServices.getAllPublicListsService(userID, searchTerm, page, limit);
    
    res.status(200).json(result);
  } catch (error) {
    logger.error('error', error);
    res.status(500).json({ error: 'Failed to retrieve public lists' });
  }
};

export const requestAccess = async (req, res) => {
  try {
    const { listID } = req.body;
    const userID = req.user.userID;

    await listServices.requestAccessService(userID, listID);

    res.status(201).json({ message: 'Access requested successfully' });
  } catch (error) {
    logger.error('error', error);
    res.status(500).json({ error: 'Failed to request access' });
  }
};

export const viewAllAccessRequests = async (req, res) => {
  try {
    const userID = req.user.userID; 

    const allAccessRequests = await listServices.viewAllAccessRequestsService(userID);

    res.status(200).json(allAccessRequests);
  } catch (error) {
    logger.error('error', error);
    res.status(500).json({ error: 'Failed to retrieve all access requests' });
  }
};


export const grantAccess = async (req, res) => {
  try {
    const {userID, listID}= req.body;

    await listServices.grantAccessService(userID, listID);
    res.status(200).json({ message: 'Access granted successfully' });
  } catch (error) {
    logger.error('error', error);
    res.status(500).json({ error: 'Failed to grant access' });
  }
};

// Controller for fetching public lists user has access to
export const getAccessiblePublicLists = async (req, res) => {
  try {
    const userID = req.user.userID;
    const searchTerm = req.query.search || '';
    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 10;

    const result = await listServices.getAccessiblePublicListsService(userID, searchTerm, page, limit);
    res.status(200).json(result);
  } catch (error) {
    logger.error('error', error);
    res.status(500).json({ error: 'Failed to retrieve accessible public lists' });
  }
};

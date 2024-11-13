import logger from '../../utils/logger.js';
import * as listServices from './listServices.js';

export const createList = async (req, res) => {
  try {
    const { name, isPublic, description, tags } = req.body;
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
    logger.error('error', error);
    //500 is used because of internal server error that server cant handle
    res.status(500).json({ error: 'Failed to create list' });
  }
};

export const getPersonalLists = async (req, res) => {
  try {
    const userID = req.user.userID;
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const limit = parseInt(req.query.limit) || 10; // Default to limit 10 if not provided

    const result = await listServices.getPersonalListsService(
      userID,
      page,
      limit,
    );

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

    const result = await listServices.getAllPublicListsService(
      userID,
      searchTerm,
      page,
      limit,
    );

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

    const allAccessRequests =
      await listServices.viewAllAccessRequestsService(userID);

    res.status(200).json(allAccessRequests);
  } catch (error) {
    logger.error('error', error);
    res.status(500).json({ error: 'Failed to retrieve all access requests' });
  }
};

export const updateAccessStatus = async (req, res) => {
  try {
    const { userID, listID, status } = req.body;

    const updatedStatus = await listServices.updateAccessStatusService(
      userID,
      listID,
      status,
    );

    res.status(200).json({ message: `Access ${updatedStatus} successfully` });
  } catch (error) {
    logger.error('error', error);
    res.status(500).json({ error: 'Failed to update access status' });
  }
};

export const getAllAccessRequestedLists = async (req, res) => {
  try {
    const userID = req.user.userID;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const accessedLists = await listServices.getAllAccessRequestedListsService(
      userID,
      page,
      limit,
    );

    res.status(200).json(accessedLists);
  } catch (error) {
    logger.error('error', error);
    res.status(500).json({ error: 'Failed to retrieve all access requests' });
  }
};

export const getListDetails = async (req, res) => {
  try {
    const { listID } = req.params;

    const listDetails = await listServices.getListDetailsService(listID);

    // if (!listDetails) {
    //   return res.status(404).json({ error: 'List not found' });
    // }

    // Send the list details as a response
    res.status(200).json(listDetails);
  } catch (error) {
    logger.error('Error fetching list details', error);
    res.status(500).json({ error: 'Failed to fetch list details' });
  }
};

export const getAccessRequestsForList = async (req, res) => {
  try {
    const listID = req.params.listID;

    // Fetch the access requests for the list
    const accessRequests =
      await listServices.getAccessRequestsForListService(listID);

    // Group access requests by their status
    const pendingRequests = accessRequests.filter(
      (req) => req.status === 'PENDING',
    );
    const approvedRequests = accessRequests.filter(
      (req) => req.status === 'APPROVED',
    );

    // Format the response
    const response = {
      listId: listID,
      pendingRequests: pendingRequests.map((req) => ({
        userId: req.userID,
        userName: req.user.name,
      })),
      approved: approvedRequests.map((req) => ({
        userId: req.userID,
        userName: req.user.name,
      })),
    };

    // Return the response
    res.status(200).json(response);
  } catch (error) {
    logger.error('Error fetching access requests', error);
    res.status(500).json({ error: 'Failed to fetch access requests' });
  }
};

export const getQuestionsForList = async (req, res) => {
  try {
    const listID = req.params.listID;
    const userID = req.user.userID;

    if (!userID) {
      return res.status(400).json({ error: 'userID is required' });
    }

    // Fetch the list of questions along with their statuses
    const questions = await listServices.getQuestionsForListService(
      listID,
      userID,
    );

    // Format the response
    const response = {
      listId: listID,
      questions: questions.map((q) => ({
        questionId: q.questionID,
        title: q.title,
        leetcodeLink: q.leetcodeLink,
        status: {
          done: q.status?.done || false,
          important: q.status?.important || false,
          review: q.status?.review || false,
        },
      })),
    };

    // Return the response
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    logger.error('Error fetching questions for list', error);
    res.status(500).json({ error: 'Failed to fetch questions for list' });
  }
};

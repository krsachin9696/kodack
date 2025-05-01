import * as listServices from './listServices.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const createList = asyncHandler(async (req, res) => {
  const { name, isPublic, description, tags } = req.body;
  const userID = req.user.userID;

  const newList = await listServices.createListService(
    userID,
    name,
    description,
    isPublic,
    tags,
  );

  res.status(200).json(newList);
});

export const updateList = asyncHandler(async (req, res) => {
  const { name, description, isPublic, tags } = req.body;
  const { listID } = req.params;
  const userID = req.user.userID;

  const updatedList = await listServices.updateListService(
    listID,
    userID,
    name,
    description,
    isPublic,
    tags,
  );

  res.status(200).json(updatedList);
});

export const getPersonalLists = asyncHandler(async (req, res) => {
  const userID = req.user.userID;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const result = await listServices.getPersonalListsService(
    userID,
    page,
    limit,
  );

  res.status(200).json(result);
});

export const getPublicLists = asyncHandler(async (req, res) => {
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
});

export const requestAccess = asyncHandler(async (req, res) => {
  const { listID } = req.body;
  const userID = req.user.userID;

  await listServices.requestAccessService(userID, listID);

  res.status(201).json({ message: 'Access requested successfully' });
});

export const viewAllAccessRequests = asyncHandler(async (req, res) => {
  const userID = req.user.userID;

  const allAccessRequests =
    await listServices.viewAllAccessRequestsService(userID);

  res.status(200).json(allAccessRequests);
});

export const updateAccessStatus = asyncHandler(async (req, res) => {
  const { userID, listID, status } = req.body;
  const ownerID = req.user.userID;

  const updatedStatus = await listServices.updateAccessStatusService(
    userID,
    listID,
    status,
    ownerID,
  );

  res.status(200).json(updatedStatus);
});

export const getAllAccessRequestedLists = asyncHandler(async (req, res) => {
  const userID = req.user.userID;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const accessedLists = await listServices.getAllAccessRequestedListsService(
    userID,
    page,
    limit,
  );

  res.status(200).json(accessedLists);
});

export const getListDetails = asyncHandler(async (req, res) => {
  const { listID } = req.params;
  const userID = req.user.userID;

  const listDetails = await listServices.getListDetailsService(listID, userID);

  res.status(200).json(listDetails);
});

export const getAccessRequestsForList = asyncHandler(async (req, res) => {
  const listID = req.params.listID;

  const accessRequests =
    await listServices.getAccessRequestsForListService(listID);

  const pendingRequests = accessRequests.filter(
    (req) => req.status === 'PENDING',
  );
  const approvedRequests = accessRequests.filter(
    (req) => req.status === 'APPROVED',
  );

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

  res.status(200).json(response);
});

export const getQuestionsForList = asyncHandler(async (req, res) => {
  const listID = req.params.listID;
  const userID = req.user.userID;

  if (!userID) {
    return res.status(400).json({ error: 'userID is required' });
  }

  const questions = await listServices.getQuestionsForListService(
    listID,
    userID,
  );

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

  res.status(200).json(response);
});

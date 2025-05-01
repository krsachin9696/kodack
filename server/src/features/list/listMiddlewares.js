import prisma from '../../config/prismaClient.js';
import { ApiError } from '../../utils/apiError.js';
import asyncHandler from '../../utils/asyncHandler.js';

// Middleware function to check list access
const checkListAccess = asyncHandler(async (req, res, next) => {
  const { listID } = req.params;
  const userID = req.user.userID;

  // First, check if the user is the owner of the list
  const list = await prisma.list.findUnique({
    where: { listID },
    select: { userID: true },
  });

  if (!list) {
    // Use ApiError for consistent error handling
    throw new ApiError(404, 'List not found');
  }

  // If the user is the owner of the list, allow access
  if (list.userID === userID) {
    return next();
  }

  // Now, check the AccessRequest table to see if the user has an APPROVED request for this list
  const accessRequest = await prisma.accessRequest.findUnique({
    where: {
      userID_listID: {
        userID,
        listID,
      },
    },
  });

  // If the accessRequest does not exist or is not approved, deny access
  if (!accessRequest || accessRequest.status !== 'APPROVED') {
    // Use ApiError for consistent error handling
    throw new ApiError(403, 'You do not have access to this list.');
  }

  // If everything passes, allow the request to continue
  return next();
});

export default checkListAccess;

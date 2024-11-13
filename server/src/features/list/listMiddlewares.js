import prisma from '../../config/prismaClient.js';

const checkListAccess = async (req, res, next) => {
  try {
    const { listID } = req.params;
    const userID = req.user.userID;

    // First, check if the user is the owner of the list
    const list = await prisma.list.findUnique({
      where: { listID },
      select: { userID: true },
    });

    if (!list) {
      return res.status(404).json({ error: 'List not found' });
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
      return res
        .status(403)
        .json({ error: 'You do not have access to this list' });
    }

    // If everything passes, allow the request to continue
    return next();
  } catch (error) {
    console.error('Error in checkListAccess middleware:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default checkListAccess;

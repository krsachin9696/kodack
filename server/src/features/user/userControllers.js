import asyncHandler from '../../utils/asyncHandler.js';

const getUserData = asyncHandler(async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  const { userID, name, username, email } = req.user;
  return res.status(200).json({
    user: { userID, name, username, email },
  });
});

export { getUserData };

const getUserData = (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const { userID, name, username, email } = req.user;
    return res.status(200).json({
      user: { userID, name, username, email },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { getUserData };

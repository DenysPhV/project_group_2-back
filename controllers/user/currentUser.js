const currentUser = async (req, res) => {
  const { _id, name, email, balance, token, createdAt, updatedAt } = req.user;
  res
    .status(200)
    .json({ _id, name, email, balance, token, createdAt, updatedAt });
};

module.exports = currentUser;

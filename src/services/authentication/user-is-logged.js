const User = require('../../models/userModel');

module.exports = async (req) => {
  const userId = req.cookies && req.cookies.userId;
  
  // Find user by ID
  const user = await User.findByPk(userId);

  return !!user;  // returns true if user exists, false otherwise
};

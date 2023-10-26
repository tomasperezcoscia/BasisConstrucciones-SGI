const User = require('../../models/userModel');

module.exports = async (req, res) => {
    const { username, password: postedPassword } = req.body;
    
    // Find user by username
    const user = await User.findOne({ where: { username } });
    
    if (user && user.password === postedPassword) {
        const oneDay = 60 * 60 * 24 * 1000;
        res.cookie('userId', user.id, { maxAge: oneDay });
        return true;
    }
    return false;
};

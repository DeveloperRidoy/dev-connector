const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // Get token from header
    const token = req.header('x-auth-token')

    // Check if no token
    if (!token) { return res.status(400).json({ msg: 'You are not logged in' }) }
    
    // Verify token
    try {
        const decoded = jwt.verify(token, process.env.jwtSecret);
        req.user = decoded.user;
    } catch (err) {
        console.log(err.message)
        return res.status(401).json({msg:'Token is not valid'})
    }
    next();
}
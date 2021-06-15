const jwt = require('jsonwebtoken');
function auth(req, res, next) {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Access Denied');
    try {
        const variefied = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = variefied;
        next();
    } catch (error) {
        res.status(400).send("Invalid token");
    }
}
module.exports = auth;
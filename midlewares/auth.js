const jwt = require('jsonwebtoken');
const env = require('dotenv');
env.config();

module.exports = function (req, res, next){
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send('Access denide. No token provided.');

    try{
        const decodePayload = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        req.user = decodePayload;
        next();
    }
    catch(ex){
        res.status(400).send('Invalid token.');
    }
}
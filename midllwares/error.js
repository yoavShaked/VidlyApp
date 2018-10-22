const winston = require('winston');

module.exports = function(error, req, res, next){
    //Loging error
    winston.error(error.message, error);
    res.status(500).send('Somthing faild.');
}
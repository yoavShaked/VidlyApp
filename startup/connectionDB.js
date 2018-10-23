const mongoose = require('mongoose');
const winston = require('winston');

module.exports = function (connectionString) {
    mongoose.connect(connectionString)
        .then(() => winston.info('Connected to MongoDB...'));
}
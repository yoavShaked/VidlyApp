const env = require('dotenv');
const express = require('express');
const winston = require('winston');
const app = express();
env.config();

require('./startup/logging')(process.env.MONGODB_HOST);
require('./startup/connectionDB')(process.env.MONGODB_HOST);
require('./startup/routes')(app);
require('./startup/production')(app);

const port = process.env.PORT || 1234;
app.listen(port, () => winston.info(`Listening on port ${port}...`));
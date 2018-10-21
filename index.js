require('express-async-errors');
const winston = require('winston');
const express = require('express');
const error = require('./midlewares/error');
const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const env = require('dotenv');
env.config();

mongoose.connect(process.env.MONGODB_HOST)
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));
  const url = '/vidly.com/api';
  const app = express();

app.use(express.json());
app.use(`${url}/genres`, genres);
app.use(`${url}/customers`, customers);
app.use(`${url}/movies`, movies);
app.use(`${url}/rentals`, rentals);
app.use(`${url}/users`, users);
app.use(`${url}/auth`, auth);
app.use(error);

const port = process.env.PORT || 1234;
app.listen(port, () => console.log(`Listening on port ${port}...`));
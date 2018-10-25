const express = require('express');
const genres = require('../routes/genres');
const customers = require('../routes/customers');
const movies = require('../routes/movies');
const rentals = require('../routes/rentals');
const users = require('../routes/users');
const auth = require('../routes/auth');
const error = require('../midllwares/error');

const url = '/api';

module.exports = function (app) {
    app.use(express.json());
    app.use(`${url}/genres`, genres);
    app.use(`${url}/customers`, customers);
    app.use(`${url}/movies`, movies);
    app.use(`${url}/rentals`, rentals);
    app.use(`${url}/users`, users);
    app.use(`${url}/auth`, auth);
    app.use(error);
}
const {User} = require('../models/user');
const express = require('express');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const env = require('dotenv');

env.config();
const router = express.Router();

router.post('/', async(request, response) => {
    const {error} = validateAuth(request.body);
    if (error) 
        return response.status(400).send(error.dtails[0].message);
    
    const user = await User.findOne({email: request.body.email});
    if (!user) 
        return response.status(400).send('Invalid email or password');
    
    const isValidPassword = await bcrypt.compare(request.body.password, user.password);
    if (!isValidPassword) 
        return response.status(400).send('Invalid email or password');
    
    const token = user.genTokenAuth();
    response.send(token);
});

var validateAuth = (user) => {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };

    return Joi.validate(user, schema);
}


module.exports = router;
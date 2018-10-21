const {User, validate} = require('../models/user');
const express = require('express');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const auth = require('../midlewares/auth');

const router = express.Router();

router.get('/me', auth, async(req, res) => {
    res.send(await User.findById(req.user._id).select('-password'));
});

router.post('/', async (request, response) => {
    const {error} = validate(request.body);
    if(error) return response.status(400).send(error.details[0].message);

    let user = await User.findOne({email: request.body.email});
    if(user) return response.status(400).send('user allready exsits');

    user = new User(_.pick(request.body, ['name', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();
    const token = user.genTokenAuth();

    response.header('x-auth-token', token).send(_.pick(user,['name', 'email','_id']));
});

module.exports = router;
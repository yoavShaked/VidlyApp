const mongoose = require('mongoose');
const Joi = require('joi');
const env = require('dotenv');
const jwt = require('jsonwebtoken');

env.config();

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
        minlength: 5,
        maxlength:50
    },
    email:{
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 255
    },
    password:{
        type: String,
        required: true,
        minlength: 7,
        maxlength: 255
    },
    isAdmin:{
        type: Boolean,
        default:false
    }
});

userSchema.methods.genTokenAuth = function(){
    return jwt.sign({_id: this._id, isAdmin: this.isAdmin}, process.env.JWT_PRIVATE_KEY);
}

const User = mongoose.model('User', userSchema);

var validateUser = (user) => {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(7).max(255).required()
    }

    return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
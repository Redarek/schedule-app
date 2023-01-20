const { Schema, model } = require('mongoose');

const userSchema =  new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isActivated: {
        type: Boolean,
        default: false
    },
    activationLink: {
        type: String
    },
    roles: [{
        type: String,
        ref: "Role"
    }],
    name: {
        type: String,
        unique: true,
        default: "no name"
    },
    balance: {
        type: Number,
        default: 0
    },
    latinName: {
        type: String,
        unique: true,
        default: "no latin name"
    }
}, {timestamps: true});

module.exports = model('User', userSchema);
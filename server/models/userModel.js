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
    role: {
        type: String,
        default: "user"
    },
    name: {
        type: String,
        default: "unknown"
    },
    spec: {
        type: String,
        default: "employee"
    },
    balance: {
        type: Number,
        default: 0
    },
}, {timestamps: true});

module.exports = model('User', userSchema);
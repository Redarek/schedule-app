const { Schema, model } = require('mongoose');

const taskSchema =  new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    employee: {
        type: String,
        required: true
    },
    employeeId: {
        type: String,
        required: true
    },
    categories: {
        type: Array,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
    },
    complete: {
        type: Boolean,
        default: false
    },
    firstReward: {
        type: Number,
        required: true
    },
    secondReward: {
        type: Number,
        required: true
    },
    penalty: {
        type: Number,
        required: true
    },
    start: {
        type: Date,
    },
    firstEnd: {
        type: Date,
    },
    secondEnd: {
        type: Date,
    },
    deadlineStatus: {
        type: String,
        default: ''
    }
}, {timestamps: true});

module.exports = model('Task', taskSchema);

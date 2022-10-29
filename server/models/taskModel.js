const { Schema, model } = require('mongoose');

const taskSchema =  new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    employee: {
        type: String,
        required: true,
        unique: true
    },
    employeeId: {
        type: String,
        required: true
    },
    spec: {
        type: String,
        required: true
    },
    timestamp: {
        type: String,
        default: Date.now
    },
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
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
        required: true
    },
    firstEnd: {
        type: Date,
        required: true
    },
    secondEnd: {
        type: Date,
        required: true
    }
});

module.exports = model('Task', taskSchema);
const { Schema, model } = require('mongoose');

const bonusSchema =  new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    task: {
        type: Schema.Types.ObjectId,
        ref: 'Task'
    },
    amount: {
        type: Number,
        required: true
    },
}, {timestamps: true});

module.exports = model('Bonus', bonusSchema);
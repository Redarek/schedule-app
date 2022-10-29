const { Schema, model } = require('mongoose');

const transactionSchema =  new Schema({
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
    }
});

module.exports = model('Transaction', transactionSchema);
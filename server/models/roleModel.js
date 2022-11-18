const { Schema, model } = require('mongoose')

const roleSchema = new Schema({
    value: {type: String, unique: true, default: "guest"},
})

module.exports = model('Role', roleSchema)
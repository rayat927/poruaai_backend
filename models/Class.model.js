const mongoose = require('mongoose')

const Class = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: {type: String},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
})

const model = mongoose.model('Class', Class)

module.exports = model 
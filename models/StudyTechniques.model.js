const mongoose = require('mongoose')

const StudyTechniques = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: {type: String},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
})

const model = mongoose.model('StudyTechniques', StudyTechniques)

module.exports = model
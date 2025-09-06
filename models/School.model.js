const mongoose = require('mongoose')

const School = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: {type: String},
    address: {type: String},
    eiin: {type: String},
    classes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Class'
        }
    ],
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
})

const model = mongoose.model('School', School)

module.exports = model
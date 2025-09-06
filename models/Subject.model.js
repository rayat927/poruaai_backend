const mongoose = require('mongoose')

const Subject = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: {type: String},
    class_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class'
    },
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
})

const model = mongoose.model('Subject', Subject)

module.exports = model
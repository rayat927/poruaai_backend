const mongoose = require('mongoose')

const Department = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: {type: String},
    school_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School'
    },
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
})

const model = mongoose.model('Department', Department)

module.exports = model
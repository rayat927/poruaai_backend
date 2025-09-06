const mongoose = require('mongoose')

const Section = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: {type: String},
    school_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School'
    },
    class_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class'
    },
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
})

const model = mongoose.model('Section', Section)

module.exports = model
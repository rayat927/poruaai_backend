const mongoose = require('mongoose')

const Upload = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    category: {type: String},
    description: {type: String},
    class_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class'
    },
    section_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Section'
    },
    file_link: {type: String},
    teacher_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher'
    },
    
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
})

const model = mongoose.model('Upload', Upload)

module.exports = model
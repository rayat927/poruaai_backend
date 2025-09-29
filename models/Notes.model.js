const mongoose = require('mongoose')

const Notes = mongoose.Schema({
    description: {type: String},
    class_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class'
    },
    section_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Section'
    },
    subject_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject'  
    },
    file_link: {type: String},
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
})

const model = mongoose.model('Notes', Notes)

module.exports = model
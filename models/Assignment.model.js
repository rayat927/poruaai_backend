const mongoose = require('mongoose')

const Assignment = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    title: {type: String},
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
    teacher_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher'
    },
    due_date: {type: Date},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
})

const model = mongoose.model('Assignment', Assignment)

module.exports = model
const mongoose = require('mongoose')


const Exam = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    title: {type: String},
    type: {type: String},
    duration: {type: String},
    total_marks: {type: Number},
    instructions: {type: String},
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
    exam_date: {type: Date},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
})

const model = mongoose.model('Exam', Exam)

module.exports = model
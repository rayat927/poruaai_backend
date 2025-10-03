const mongoose = require('mongoose')


const Exam = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    title: {type: String},
    total_marks: {type: Number},
    instructions: {type: String},
    questions: {type: Object},
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
    file_links: [{type: String}],
    teacher_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher'
    },
    ai_generated: {
        type: Boolean
    },
    start_time: {type: String},
    end_time: {type: String},
    exam_date: {type: Date},
    is_published: {type: Boolean},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
})

const model = mongoose.model('Exam', Exam)

module.exports = model
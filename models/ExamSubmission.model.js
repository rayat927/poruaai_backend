const mongoose = require('mongoose')

const ExamSubmission = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    exam_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exam'
    },
    file_links: [{type: String}],
    answers: {type: String},
    ai_analysis: {type: Object},

    marks: {type: Number},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
})

const model = mongoose.model('ExamSubmission', ExamSubmission)

module.exports = model
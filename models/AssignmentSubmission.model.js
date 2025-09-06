const mongoose = require('mongoose')

const AssignmentSubmission = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    assignment_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Assignment'
    },
    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    file_link: {type: String},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
})

const model = mongoose.model('AssignmentSubmission', AssignmentSubmission)

module.exports = model
const mongoose = require('mongoose')

const StudentRoutine = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    days: [
        {type: String}
    ],
    title: {type: String},
    description: {type: String},
    duration_in_minutes: {type: Number},
    study_techniques: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'StudyTechniques'
        }
    ],
    subjects: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Subject'
        }
    ],
    start_time: {type: String},
    activated: {type: Boolean},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
})

const model = mongoose.model('StudentRoutine', StudentRoutine)  

module.exports = model
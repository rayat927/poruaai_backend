const mongoose = require('mongoose')

const ClassRoutine = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    class_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class'
    },
    section_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Section'
    },
    teacher_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher'
    },
    subject_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
    },
    day: {type: String},
    start_time: {type: String},
    end_time: {type: String},
    school_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School'
    },
    description: {type: String},
    room: {type: String},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
}, {
    toJSON: {
        virtuals: true
    }
})

ClassRoutine.virtual('students', {
    ref: 'Student',
    localField: 'section_id',
    foreignField: 'section_id'
})

const model = mongoose.model('ClassRoutine', ClassRoutine)

module.exports = model
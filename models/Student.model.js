const mongoose = require('mongoose')

const Student = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true
    },
    school_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School'
    },
    class_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class'
    },
  
    roll_no: {type: String},
    student_id: {type: String, unique: true},
    parent_number: {type: String},
    streaks: {type: Number},

    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
})

const model = mongoose.model('Student', Student)

module.exports = model
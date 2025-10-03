const mongoose = require('mongoose')

const Teacher = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    school_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School'
    },
    teaching_experience: {
        type: Number
    },
    teaching_subject: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
    }],
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department'
    },
    // class_id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Class'
    // },
    // section_id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Section'
    // },
   

    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
})  

const model = mongoose.model('Teacher', Teacher)    

module.exports = model
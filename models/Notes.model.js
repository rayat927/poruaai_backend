const mongoose = require('mongoose')

const Notes = mongoose.Schema({
    title: {type: String},
    class_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class'
    },
    
    file_link: {type: String},
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
})

const model = mongoose.model('Notes', Notes)

module.exports = model
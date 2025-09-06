const mongoose = require('mongoose')

const User = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    username: {type: String, required: true,},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    // address: {type: String}
    role: {type: String},
    phone: {type: String},
    profile_pic: {type: String},
    address: {type: String},
    contacts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
    
})

const model = mongoose.model('User', User)

module.exports = model 
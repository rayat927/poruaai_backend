const router = require('express').Router()
const { populate } = require('dotenv')
const Teacher = require('../models/Teacher.model')

router.get('/', async (req, res) => {
    let queries = {}
    if(req.query.school_id) queries.school_id = req.query.school_id
    if(req.query.user_id) queries.user_id = req.query.user_id
    const teachers = await Teacher.find(queries).populate('user_id').populate(
        {
            path: 'school_id',
            populate: {
                path: 'classes'
            }
        }
    ).populate({
        path: 'teaching_subject',
        populate:{
            path: 'class_id'
        }
    
    }).populate('department')
    res.json(teachers)
})

router.post('/', async (req, res) => {
    const newTeacher = new Teacher(req.body)
    await newTeacher.save()
    res.json(newTeacher)
})

router.delete('/:id', async (req, res) => {
    const deletedTeacher = await Teacher.findByIdAndDelete(req.params.id)
    res.json(deletedTeacher)
})  

module.exports = router
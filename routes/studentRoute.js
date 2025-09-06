const router = require('express').Router()
const Student = require('../models/Student.model')  

router.get('/', async (req, res) => {
    let queries = {}
    if(req.query.school_id) queries.school_id = req.query.school_id
    if(req.query.class_id) queries.class_id = req.query.class_id
    if(req.query.user_id) queries.user_id = req.query.user_id
    console.log(queries);
    
    const students = await Student.find(queries)
    .populate('user_id')
    .populate('school_id')
    .populate('class_id')
    res.json(students)  
})

router.post('/', async (req, res) => {
    const newStudent = new Student(req.body)
    await newStudent.save()
    res.json(newStudent)
})

router.delete('/:id', async (req, res) => {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id)
    res.json(deletedStudent)
})

module.exports = router
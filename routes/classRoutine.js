const router = require('express').Router()
const ClassRoutine = require('../models/classRoutine.model')

router.get('/', async (req, res) => {
    let queries = {} 
    if(req.query.id) queries._id = req.query.id
    if(req.query.class_id) queries.class_id = req.query.class_id
    if(req.query.section_id) queries.section_id = req.query.section_id
    if(req.query.teacher_id) queries.teacher_id = req.query.teacher_id
    if(req.query.subject_id) queries.subject_id = req.query.subject_id
    if(req.query.day) queries.day = req.query.day
   if(req.query.school_id) queries.school_id = req.query.school_id

    const classRoutines = await ClassRoutine.find(  queries).populate('students').populate('class_id').populate('section_id').populate('teacher_id').populate('subject_id').populate('school_id')
    const formattedData = classRoutines.map(classRoutine => {
        const section = classRoutine.section_id;
        const totalStudents = classRoutine.students.length;
        return {
            subject: classRoutine.subject_id.name,
            students: totalStudents,
            schedule: `${classRoutine.day} - ${classRoutine.start_time} PM`,
            room: classRoutine.room,
            description: classRoutine.description,
            status: classRoutine.status
        }
    })

    res.json(formattedData)
})

router.post('/', async (req, res) => {
    const newClassRoutine = new ClassRoutine(req.body)
    await newClassRoutine.save()
    res.json(newClassRoutine)
})

router.delete('/:id', async (req, res) => {
    const deletedClassRoutine = await ClassRoutine.findByIdAndDelete(req.params.id)
    res.json(deletedClassRoutine)
})

module.exports = router
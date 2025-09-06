const router = require('express').Router()
const StudyRoutine = require('../models/StudentRoutine.model')

router.get('/', async (req, res) => {
    const studyRoutines = await StudyRoutine.find()
    res.json(studyRoutines)
})

router.post('/', async (req, res) => {
    const newStudyRoutine = new StudyRoutine(req.body)
    await newStudyRoutine.save()
    res.json(newStudyRoutine)
})

router.delete('/:id', async (req, res) => {
    const deletedStudyRoutine = await StudyRoutine.findByIdAndDelete(req.params.id)
    res.json(deletedStudyRoutine)
})

module.exports = router
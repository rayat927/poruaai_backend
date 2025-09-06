const router = require('express').Router()

const StudyTechniques = require('../models/StudyTechniques.model')

router.get('/', async (req, res) => {
    const studyTechniques = await StudyTechniques.find()
    res.json(studyTechniques)
})

router.post('/', async (req, res) => {
    const newStudyTechniques = new StudyTechniques(req.body)
    await newStudyTechniques.save()
    res.json(newStudyTechniques)
})

router.delete('/:id', async (req, res) => {
    const deletedStudyTechniques = await StudyTechniques.findByIdAndDelete(req.params.id)
    res.json(deletedStudyTechniques)
})

module.exports = router

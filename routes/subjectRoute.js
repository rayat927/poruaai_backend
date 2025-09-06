const router = require('express').Router()
const Subject = require('../models/Subject.model')

router.get('/', async (req, res) => {
    const subjects = await Subject.find()
    res.json(subjects)
})

router.post('/', async (req, res) => {
    const newSubject = new Subject(req.body)
    await newSubject.save()
    res.json(newSubject)
})

router.delete('/:id', async (req, res) => {
    const deletedSubject = await Subject.findByIdAndDelete(req.params.id)
    res.json(deletedSubject)
})

module.exports = router
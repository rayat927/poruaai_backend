const router = require('express').Router()
const School = require('../models/School.model')   

router.get('/', async (req, res) => {
    const schools = await School.find().populate('classes')
    res.json(schools)
})

router.post('/', async (req, res) => {
    const newSchool = new School(req.body)
    await newSchool.save()
    res.json(newSchool)
})

router.delete('/:id', async (req, res) => {
    const deletedSchool = await School.findByIdAndDelete(req.params.id)
    res.json(deletedSchool)
})

module.exports = router
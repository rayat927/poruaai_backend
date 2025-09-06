const router = require('express').Router()
const Section = require('../models/Section.model')  

router.get('/', async (req, res) => {
    const sections = await Section.find()
    res.json(sections)  
})

router.post('/', async (req, res) => {
    const newSection = new Section(req.body)
    await newSection.save()
    res.json(newSection)
})

router.delete('/:id', async (req, res) => {
    const deletedSection = await Section.findByIdAndDelete(req.params.id)
    res.json(deletedSection)
})

module.exports = router
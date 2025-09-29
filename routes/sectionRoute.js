const router = require('express').Router()
const Section = require('../models/Section.model')  

router.get('/', async (req, res) => {
    let queries = {}
    if(req.query.class_id) queries.class_id = req.query.class_id
    if(req.query.school_id) queries.school_id = req.query.school_id
    const sections = await Section.find(queries).populate('class_id').populate('school_id')
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
const router = require('express').Router()
const Class = require('../models/Class.model')

router.get('/', async (req, res) => {
    let queries = {}
    queries.school_id = req.query.school_id !== undefined ? req.query.school_id : null
    const classes = await Class.find(  queries)
    res.json(classes)
})

router.post('/', async (req, res) => {
    const newClass = new Class(req.body)
    await newClass.save()
    res.json(newClass)
})

router.delete('/:id', async (req, res) => {
    const deletedClass = await Class.findByIdAndDelete(req.params.id)
    res.json(deletedClass)
})

module.exports = router
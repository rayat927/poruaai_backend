const router = require('express').Router()
const Department = require('../models/Department.model')

router.get('/', async (req, res) => {
    const departments = await Department.find().populate('school_id')
    res.json(departments)
})

router.post('/', async (req, res) => {
    const newDepartment = new Department(req.body)
    await newDepartment.save()
    res.json(newDepartment)
})

router.delete('/:id', async (req, res) => {
    const deletedDepartment = await Department.findByIdAndDelete(req.params.id)
    res.json(deletedDepartment)
})

module.exports = router
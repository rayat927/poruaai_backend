const router = require('express').Router()
const Assignment = require('../models/Assignment.model')
const AssignmentSubmission = require('../models/AssignmentSubmission.model')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })

router.get('/', async (req, res) => {
    const assignments = await Assignment.find().populate({
        path: 'subject_id',

    })
    res.json(assignments)
})

router.post('/', upload.single('file'), async (req, res) => {

    const file_link = `${req.protocol}://${req.get('host')}/` + req.file.path
    const data = {
        title: req.body.title,
        class_id: req.body.class_id,
        section_id: req.body.section_id,
        file_link: file_link,
        description: req.body.description,
        teacher_id: req.body.teacher_id,
        due_date: req.body.due_date,
        subject_id: req.body.subject_id
    }

    const newUpload = new Assignment(data)
    await newUpload.save()
    res.json(newUpload)
})

router.delete('/:id', async (req, res) => {
    const deletedAssignment = await Assignment.findByIdAndDelete(req.params.id)
    res.json(deletedAssignment.populate({
        path: 'student_id',
        populate: {
            path: 'user_id'
        }
    }))
})

// submissions

router.get('/submissions', async (req, res) => {
    let queries = {}
    if (req.query.class_id) queries.class_id = req.query.class_id
    if (req.query.section_id) queries.section_id = req.query.section_id
    const submissions = await AssignmentSubmission.find(queries).populate({
        path: 'student_id',
        populate: {
            path: 'user_id'
        }
    })
    res.json(submissions)
})

router.post('/submissions', upload.single('file'), async (req, res) => {

    const file_link = `${req.protocol}://${req.get('host')}/` + req.file.path


    const body = {
        student_id: req.body.student_id,
        assignment_id: req.body.assignment_id,
        file_link: file_link
    }
    const newSubmission = new AssignmentSubmission(body)


    await newSubmission.save()
    res.json(newSubmission)
})

router.put('/submissions/:id', async (req, res) => {
    const updatedSubmission = await AssignmentSubmission.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(updatedSubmission)
})

module.exports = router
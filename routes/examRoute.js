const router = require('express').Router()
const e = require('express')
const Exam = require('../models/Exam.model')
const ExamSubmission = require('../models/ExamSubmission.model')
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
    const exams = await Exam.find()
    res.json(exams)
})

router.post('/', upload.array('files'), async (req, res) => {
    const files = req.files
    const file_links = files.map(file => `${req.protocol}://${req.get('host')}/` + file.filename)
    const data = {
        title: req.body.title,
        class_id: req.body.class_id,
        section_id: req.body.section_id,
        file_links: file_links,
        total_marks: req.body.total_marks,
        instructions: req.body.instructions,
        subject_id: req.body.subject_id,
        ai_generated: req.body.ai_generated,
        duration: req.body.duration,
        questions: req.body.questions,
        exam_date: req.body.exam_date,
        start_time: req.body.start_time,
        end_time: req.body.end_time,
        teacher_id: req.body.teacher_id,
        is_published: false

    }
    const newUpload = new Exam(data)
    await newUpload.save()
    res.json(newUpload)
})

router.delete('/individual/:id', async (req, res) => {
    const deletedUpload = await Exam.findByIdAndDelete(req.params.id)
    res.json(deletedUpload)
})

router.get('/submission', async (req, res) => {
    const submissions = await ExamSubmission.find()
    res.json(submissions)
})

router.post('/submission', upload.array('files'), async (req, res) => {
    const files = req.files
    const file_links = files.map(file => `${req.protocol}://${req.get('host')}/` + file.filename)
    const data = {
        student_id: req.body.student_id,
        exam_id: req.body.exam_id,
        file_links: file_links,
        answers: req.body.answers,
        ai_analysis: req.body.ai_analysis,
        marks: req.body.marks,
    }
    const newSubmission = new ExamSubmission(data)
    await newSubmission.save()
    res.json(newSubmission)
})

router.put('/submission/:id', async (req, res) => {
    const updatedSubmission = await ExamSubmission.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(updatedSubmission)
})

router.delete('/submission/:id', async (req, res) => {
    const deletedSubmission = await ExamSubmission.findByIdAndDelete(req.params.id)
    res.json(deletedSubmission)
})

module.exports = router
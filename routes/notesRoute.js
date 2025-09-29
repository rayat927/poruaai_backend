const router = require('express').Router()
const Notes = require('../models/Notes.model')

const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })


router.get('/', async (req, res) => {
    const notes = await Notes.find()
    res.json(notes)
})

router.post('/', upload.single('file'), async (req, res) => {
    const file_link = `${req.protocol}://${req.get('host')}/` + req.file.path
    const data = {
        description: req.body.description,
        class_id: req.body.class_id,
        section_id: req.body.section_id,
        file_link: file_link,
        teacher_id: req.body.teacher_id,
        subject_id: req.body.subject_id
    }
    const newUpload = new Notes(data)
    await newUpload.save()
    res.json(newUpload)
})

router.delete('/:id', async (req, res) => {
    const deletedUpload = await Notes.findByIdAndDelete(req.params.id)
    res.json(deletedUpload)
})


module.exports = router

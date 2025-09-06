const router = require('express').Router()
const Upload = require('../models/Upload.model')
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
    const uploads = await Upload.find()
    res.json(uploads)
})

router.post('/',upload.single('file'), async (req, res) => {

    const file_link = `${req.protocol}://${req.get('host')}/` + req.file.path
    const data = {
        name: req.body.name,
        class_id: req.body.class_id,
        section_id: req.body.section_id,
        file_link: file_link,
        category: req.body.category,
        description: req.body.description,
        teacher_id: req.body.teacher_id
    }

    const newUpload = new Upload(data)
    await newUpload.save()
    res.json(newUpload)
})

router.delete('/:id', async (req, res) => {
    const deletedUpload = await Upload.findByIdAndDelete(req.params.id)
    res.json(deletedUpload)
})

module.exports = router
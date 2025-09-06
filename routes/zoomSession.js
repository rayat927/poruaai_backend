const router = require('express').Router()
const ZoomSession = require('../models/zoomSession.model') 

router.get('/', async (req, res) => {
    const zoomSessions = await ZoomSession.find()
    res.json(zoomSessions)
})

router.post('/', async (req, res) => {
    const newZoomSession = new ZoomSession(req.body)
    await newZoomSession.save()
    res.json(newZoomSession)
})

router.delete('/:id', async (req, res) => {
    const deletedZoomSession = await ZoomSession.findByIdAndDelete(req.params.id)
    res.json(deletedZoomSession)
})

module.exports = router
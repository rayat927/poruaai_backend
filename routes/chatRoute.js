const router = require('express').Router()

const GroupMessage = require('../models/GroupMessage.model')
const Group = require('../models/Group.model')

router.get('/group', async (req, res) => {
    const groups = await Group.find().populate(
        {
            path: 'lastMessage',
            populate: {
                path: 'sender'
            }
        }
    ).populate('members')
    res.json(groups)
})

router.get('/group/messages', async (req, res) => {
    const messages = await GroupMessage.find({ group: req.query.group_id }).populate('sender').populate('readBy').populate('group') 
    res.json(messages)
})

router.put('/group/add_member', (req, res) =>{
    Group.findById(req.query.group_id)
    .then(group => {
        group.members.push(req.body.id)
        group.save()
        res.json(group)
    })
})



router.post('/group/', async (req, res) => {
    const newGroup = new Group(req.body)
    await newGroup.save()
    res.json(newGroup)
})

router.delete('/group/:id', async (req, res) => {
    const deletedGroup = await Group.findByIdAndDelete(req.params.id)
    res.json(deletedGroup)
})

module.exports = router
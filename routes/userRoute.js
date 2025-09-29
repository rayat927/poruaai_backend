const router = require('express').Router()
const User = require('../models/User.model')
const mongoose = require('mongoose')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

async function getUsersWithProfession(schoolId, searchText) {

  // console.log(schoolId);
  
  return await User.aggregate([
    // Join with Student
    {
      $lookup: {
        from: "students",
        localField: "_id",
        foreignField: "user_id",
        as: "studentData"
      }
    },
    // Join with Teacher
    {
      $lookup: {
        from: "teachers",
        localField: "_id",
        foreignField: "user_id",
        as: "teacherData"
      }
    },
    // Add profession field
    {
      $addFields: {
        profession: {
          $cond: {
            if: { $gt: [{ $size: "$studentData" }, 0] },
            then: { $arrayElemAt: ["$studentData", 0] },
            else: { $arrayElemAt: ["$teacherData", 0] }
          }
        }
      }
    },
    // Remove unwanted fields
    {
      $project: {
        studentData: 0,
        teacherData: 0, 
        password: 0
      }
    },
    // Match school and username search
    {
      $match: {
        "profession.school_id": new mongoose.Types.ObjectId(schoolId),
        username: { $regex: searchText, $options: "i" } // case-insensitive match
      }
    }
  ]);
}

router.get('/', async (req, res) => {
    const users = await User.find()
    res.json(users)
})

router.get('/individual/:id', async (req, res) => {
    const user = await User.findById(req.params.id)
    res.json(user)
})

router.get('/user_with_profession', async (req, res) => {
    const { schoolId, searchText } = req.query;
    const users = await getUsersWithProfession(schoolId, searchText);
    res.json(users);
})

router.post('/signup', async (req, res) => {
    const { username, email, password, role, phone, address } = req.body
    const salt = await bcrypt.genSalt(10)
    const existingUser = await User.findOne({
        $or: [{ email: email }, { phone:phone}]
    })
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' })
    }
    else {
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = new User({
            username: username,
            email: email,
            password: hashedPassword,
            role: role,
            phone: phone,
            address: address
        })
        await newUser.save()
        res.json(newUser)
    }

})

router.get('/contact', (req, res) => {
    User.findById(req.query.user_id).populate('contacts')
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' })
            }
            res.json(user.contacts)
        })
        .catch(err => {
            res.status(500).json({ message: 'Error finding user' })
        })
})

router.put('/add_contact', (req, res) => {
    const {  contact_id } = req.body
    User.findById(req.query.user_id)
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' })
            }
            user.contacts.push(contact_id)
            user.save()
                .then(updatedUser => {
                    res.json(updatedUser)
                })
                .catch(err => {
                    res.status(500).json({ message: 'Error updating user' })
                })
        })
        .catch(err => {
            res.status(500).json({ message: 'Error finding user' })
        })
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
        return res.status(404).json({ message: 'User not found' })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
        return res.status(403).json({ message: 'Invalid password' })
    }
    const token = jwt.sign({ id: user._id, role: user.role, email: user.email }, '123secret', { expiresIn: '1d' })
    res.json({ token, role: user.role })
})

module.exports = router
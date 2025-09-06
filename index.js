const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const {createSocket} = require('./socket/createSocket')
const http = require('http')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true})) 

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then((result) => console.log('connected to db'))  
  .catch(e => console.log(e))

app.use(express.static("./uploads")) 



const userRoute = require('./routes/userRoute')
const classRoute = require('./routes/classRoute')
const teacherRoute = require('./routes/teacherRoute')
const studentRoute = require('./routes/studentRoute')
const sectionRoute = require('./routes/sectionRoute')
const uploadRoute = require('./routes/uploadRoute') 
const schoolRoute = require('./routes/schoolRoute')
const subjectRoute = require('./routes/subjectRoute')
const departmentRoute = require('./routes/departmentRoute')
const assignmentRoute = require('./routes/assignmentRoute')
const studyTechniquesRoute = require('./routes/studyTechniquesRoute')
const studentRoutine = require('./routes/studyRoutine')
const zoomSession = require('./routes/zoomSession')
const chatRoute = require('./routes/chatRoute')


// app.use('/', (req, res) => {
//     res.json({msg:'hello from Porua AI'})
// })

app.use('/user', userRoute)
app.use('/class', classRoute)
app.use('/teacher', teacherRoute)
app.use('/student', studentRoute)
app.use('/section', sectionRoute)
app.use('/upload', uploadRoute)
app.use('/school', schoolRoute)
app.use('/subject', subjectRoute)
app.use('/department', departmentRoute)
app.use('/assignment', assignmentRoute)
app.use('/study_techniques', studyTechniquesRoute)
app.use('/student_routine', studentRoutine)
app.use('/zoom_session', zoomSession)
app.use('/chat', chatRoute)

const server = http.createServer(app);
createSocket(server);

server.listen(PORT, () => console.log('server listening to port 5000'))
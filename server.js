const express = require('express')
const connectDB = require('./config/db')
const seedDB = require('./config/seedDB/seedDB')
require('dotenv').config();
const path = require('path')
const projects = require('./routes/projects')
const tasks = require('./routes/tasks')
const categories = require('./routes/categories')
const files = require('./routes/files')
const users = require('./routes/users')
const user = require('./routes/user')
const contacts = require('./routes/contacts')
const activity = require('./routes/activity')
const workingTime = require('./routes/workingtime')

const app = express()

const passport = require('passport')
require('./passport')(passport)

const port = process.env.PORT || 5000
connectDB()
//seedDB() //wait 15 seconds

app.use(express.json())
app.use(passport.initialize())
app.use('/api/projects', projects)
app.use('/api/tasks', tasks)
app.use('/api/categories', categories)
app.use('/api/files', files)
app.use('/api/users', users)
app.use('/api/user', user)
app.use('/api/activity', activity)
app.use('/api/contacts', contacts)
app.use('/api/workingtime', workingTime)

/*
before deployment comment out REDUX DEVTOOL in:
\client\src\store.js
*/

//Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  //set static folder
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
} else {
  app.get('/', (req, res) => res.send('API Running'))
}

app.listen({ port }, () => {
  console.log(`Server is listeing to port http://localhost:${port}`)
})

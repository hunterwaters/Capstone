require('dotenv').config()

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

// routes
const userRouter = require('./src/routes/userRoutes')
const tasksRouter = require('./src/routes/taskRoutes')

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
  }

const db = require('./src/config/index')

db.connToDB()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

app.get('/', (req,res) => {
    res.status(200).json({message: 'Welcome to my app!!'})
})

app.use(cors())
app.use(userRouter)
app.use(tasksRouter)

const port = process.env.PORT || 8000

app.listen(port, () => console.log('server started'))

module.exports = app

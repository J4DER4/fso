const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const notesRouter = require('./controllers/notesApi')
const logger = require('./utils/logger.js')

const app = express()

console.log('Connecting to:', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { family: 4 })
    .then(() => {
        logger.info('Connection to mongoDB established')
    })
    .catch((error) => {
        logger.error('Error during MongoDB connection:', error.message)
    })

app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/notes', notesRouter)

app.use(middleware.errorHandler)
app.use(middleware.errorHandler)

module.exports = app

const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config.js')
const logger = require('./utils/logger.js')
const middleware = require('./utils/middleware.js')
const blogsRouter = require('./controllers/blogsApi.js')

const app = express()

const mongoUrl = config.MONGODB_URI
console.log('Connecting to:', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { family: 4 })
    .then(() => {
        logger.info('Connection to mongoDB established')
    })
    .catch((error) => {
        logger.error('Error during MongoDB connection:', error.message)
    })

app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/blogs', blogsRouter)
app.use(middleware.errorHandler)


module.exports = app

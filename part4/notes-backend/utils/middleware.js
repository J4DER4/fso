const logger = require('./logger.js')

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malofoy draco kakka' })
    } else if (error.name === 'ValidationError') { // catch wrong post requests
        return response.status(400).json({ error: error.message })
    }
    next(error)
}

const UnkownEndpoint = (request, response) => {
    response.status(404).send({ error: "Unkown Endpoint" })
}

const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next()
}

module.exports = { errorHandler, UnkownEndpoint, requestLogger }



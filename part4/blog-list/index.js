const app = require('./app')
const PORT = require('./utils/config.js').PORT
const logger = require('./utils/logger')

app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`)
})

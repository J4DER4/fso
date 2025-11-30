require('dotenv').config()

const PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI


switch (process.env.NODE_ENV) {
    case 'development':
        MONGODB_URI = process.env.DEV_MONGODB_URI
        break
    case 'test':
        MONGODB_URI = process.env.TEST_MONGODB_URI
        break
    default:
        break
}

module.exports = { MONGODB_URI, PORT }

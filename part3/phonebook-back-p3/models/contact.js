const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI
console.log('Connecting to:', url)

mongoose
    .connect(url)
    .then(onConn => {
        console.log('Connection established')
    })
    .catch(error => {
        console.log('Error during connection:', error.message)
    })


const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
    },
    number: {
        type: String,
        minLength: 8,
        validate: {
            validator: function(v) {
                return /^(\d{2}-|\d{3}-).*$/.test(v)
            },
            message: props => props.value + ' is not a valid number format. correct start is xxx-.. or xx-...'
        }
    }
})

contactSchema.set('toJSON', {
    transform: (doc, retObj) => {
        retObj.id = retObj._id.toString()
        delete retObj._id
        delete retObj.__v
    }
})

module.exports = mongoose.model('Contact', contactSchema)



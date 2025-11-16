require("dotenv").config()
const express = require('express')
const morgan = require('morgan')
const Contact = require('./models/contact.js')

const app = express()
const PORT = process.env.PORT

const errorHandler = (error, request, response, next) => {
    console.log(error.message)
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformed id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).send({ error: error.message })
    }
    next(error)
}

app.use(express.json())
app.use(express.static('dist'))
app.use(morgan('dev'))

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.get('/api/persons', (request, response) => {
    Contact.find({}).then(contacts => {
        response.json(contacts)
    })
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    Contact.findById(id).then(contact => {
        response.json(contact)
    }).catch(err => {
        response.json({ errormsg: err.message })
    })
})

app.get('/info', (request, response) => {
    Contact.find().countDocuments()
        .then(amount => {
            const date = new Date()
            console.log('got info GET request')
            response.send(
                '<p> Phonebook has info for ' + amount + ' people </p>' +
                '<p>' + date.toLocaleString('en-FI') + '</p>'
            )
        })

})

app.delete('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    Contact.findByIdAndDelete(id)
        .then(result => {
            response.status(204).end()
        })
        .catch(err => next(err))
})

app.put('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    const values = request.body
    const opts = { returnDocument: 'after' } //returns the object after update (default: 'before')

    Contact.findByIdAndUpdate(id, values, opts)
        .then(updatedPerson => {
            console.log(updatedPerson)
            response.json(updatedPerson)
        })
        .catch(error => {
            next(error)
        })
})

app.post('/api/persons', (request, response, next) => {

    const body = request.body
    if (!body.number) {
        return response.status(400).json({
            error: 'number field missing'
        })
    }
    if (!body.name) {
        return response.status(400).json({
            error: 'name field missing'
        })
    }

    const person = new Contact({
        name: body.name,
        number: body.number,
    })

    person.save()
        .then(savedContact => {
            console.log('added person:', JSON.stringify(savedContact))
            response.json(person)
        })
        .catch(error => {
            next(error)
        })

})

app.use(unknownEndpoint)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log('Server running on port:' + PORT + ' TIME: ' + Date.now())
})

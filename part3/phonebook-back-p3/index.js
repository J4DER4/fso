require("dotenv").config()
const express = require('express')
const morgan = require('morgan')
const Contact = require('./models/contact.js')


const app = express()
const PORT = process.env.PORT

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
    const amount = "Undefined"
    const date = new Date()
    console.log('got info GET request')
    response.send(
        '<p> Phonebook has info for ' + amount + ' people </p>' +
        '<p>' + date.toLocaleString('en-FI') + '</p>'
    )
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id

    persons = persons.filter(p => p.id !== id)

    console.log('Deleted person with ID:', id)

    response
        .status(204)

})

app.post('/api/persons', (request, response) => {

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

    // const nameExist = persons.find(
    //     p => p.name.toLowerCase() === body.name.toLowerCase())
    // if (nameExist) {
    //     return response.status(400).json({
    //         error: 'Name already in use!'
    //     })
    // }

    const person = new Contact({
        name: body.name,
        number: body.number,
    })

    person.save().then(savedContact => {
        console.log('added person:', JSON.stringify(savedContact))
        response.json(person)
    })
})

app.use(unknownEndpoint)
app.listen(PORT, () => {

    console.log('Server running on port:' + PORT + ' TIME: ' + Date.now())
})

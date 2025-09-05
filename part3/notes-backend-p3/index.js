
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Note = require('./models/note.js')
// const cors = require('cors')

const PORT = process.env.PORT

const app = express()
app.use(express.json())
app.use(morgan('dev'))
app.use(express.static('dist'))
// app.use(cors())

app.get('/', (requrest, response) => {
    response.send('<h1>Hello Jhon poop</h1>')
})

app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes)
    })
})

app.get('/api/notes/:id', (requrest, response) => {
    const id = requrest.params.id
    Note
        .findById(id).then(note => {
            response.json(note)
        })
        .catch(err => {
            response.json({ errormsg: err.message })
        })
})

app.delete('/api/notes/:id', (request, response) => {
    const id = request.params.id
    notes = notes.filter(note => note.id !== id)

    response.status(204).end()
})

app.post('/api/notes', (request, response) => {
    const body = request.body

    if (!body.content) {
        return response.status(400).json({
            error: 'Content missing'
        })
    }

    const note = new Note({
        content: body.content,
        important: body.important || false,
    })

    note.save().then(savedNote => {
        response.json(savedNote)
        console.log("New note added")
    })

})
app.listen(PORT, () => {
    console.log('Server running on port:' + PORT + ' TIME: ' + Date.now())
})

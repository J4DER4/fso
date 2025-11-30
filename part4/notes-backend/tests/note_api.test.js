const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app.js')
const Note = require('../models/noteSchema.js')
const api = supertest(app)

const testNotes = [
    {
        content: 'HTML is easy',
        important: false
    },
    {
        content: 'Nerf smolder',
        important: true
    },
]

beforeEach(async () => { // initialize testdb
    await Note.deleteMany({})
    let noteObject = new Note(testNotes[0])
    await noteObject.save()
    noteObject = new Note(testNotes[1])
    await noteObject.save()
})

test('all notes are returned', async () => {
    const response = await api.get('/api/notes')
    assert.strictEqual(response.body.length, testNotes.length)
})

test('a spesific note is found in the ret notes', async () => {
    const response = await api.get('/api/notes')
    const contents = response.body.map(e => e.content)
    assert(contents.includes('HTML is easy'))
})

test('notes are returned as json', async () => {
    await api
        .get('/api/notes')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

after(async () => {
    await mongoose.connection.close()
})

import { useState, useEffect } from 'react'

import Note from './components/Note.jsx'
import Notification from './components/Notification.jsx'
import noteService from './services/notes.js'
import Footer from './components/Footer.jsx'

const App = () => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState('a new note ...')
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)

    const hook = () => {
        noteService
            .getAll()
            .then(initialNotes => {
                setNotes(initialNotes)
                console.log('Rendering:', initialNotes.length, 'notes')
            })
    }
    useEffect(hook, [])

    const toggleImportantOf = id => {
        const note = notes.find(n => n.id === id)
        const changedNote = { ...note, important: !note.important }

        noteService
            .update(id, changedNote)
            .then(returnedNote => {
                setNotes(notes.map(note => note.id === id ? returnedNote : note))
            })
            .catch(error => {
                console.log(error);
                setErrorMessage('Note "' + note.content + '" didint exsist on server!')
                setTimeout(() => { setErrorMessage(null) }, 5000)
                setNotes(notes.filter(n => n.id !== id))
            })
    }

    const addNote = (event) => {
        event.preventDefault()
        const noteObject = {
            content: newNote,
            important: Math.random() > 0.5,
        }
        noteService
            .create(noteObject)
            .then(returnedNote => {
                setNotes(notes.concat(returnedNote))
                setNewNote('')
            })
    }

    const handleNoteChange = (event) => {
        console.log('event value:', event.target.value);
        setNewNote(event.target.value)
    }

    const notesToShow = showAll ? notes : notes.filter(note => note.important)

    return (
        <div>
            <h1>Notes</h1>
            <Notification message={errorMessage} />
            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    Show {showAll ? 'important' : 'all'}
                </button>
            </div>
            <ul>
                {notesToShow.map(note =>
                    <Note
                        key={note.id}
                        note={note}
                        toggleImportant={() => toggleImportantOf(note.id)}
                    />
                )}
            </ul>
            <form onSubmit={addNote}>
                <input value={newNote} onChange={handleNoteChange} />
                <button type="submit">save</button>
            </form>
            <Footer />
        </div>
    )
}
export default App

import { useState } from 'react'

import Note from './components/Note'

const App = (props) => {
  const [notes, setNotes] = useState(props.notes) // state for the notes
  const [newNote, setNewNote] = useState('a new note...')// state for the input field
  const [showAll, setShowAll] = useState(true) // boolean state for the show all button

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }
  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
      id: String(notes.length + 1),
    }
    setNotes(notes.concat(noteObject))
    setNewNote('')
  }
  
  const notesToShow = showAll // boolean check to determine the container for the notes
  ? notes // if true, show all notes
  : notes.filter(note => note.important) // if false, show only important notes

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note key={note.id} note={note} />
        )}
      </ul>
    </div>
  )
}
export default App

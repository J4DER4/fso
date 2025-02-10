import {useState } from 'react'
import {
  SearchResultElement,
  SearchElement,
  AddContactElement
} from './components/Components'

const App = () => {

  const [persons, setPersons] = useState([ // array of objects
    { name: 'Arto Hellas',
      number: '040-123456'
    } 
  ])
  const [newContact, setNewContact] = useState(
    {name: '', number: ''}
  )// name and number

  const [search, setSearch] = useState('') // search state


  const addPerson = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newContact.name)){ 
      alert(`${newContact.name} is already added to the phonebook`)
    }else {
      const personObject = {
        name: newContact.name,
        number: newContact.number
      }
    setPersons(persons.concat(personObject))
    setNewContact({name: '', number: ''})
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewContact({...newContact, name: event.target.value})
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewContact({...newContact, number: event.target.value})
  }
  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setSearch(event.target.value)
  }

  const searchResults = persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase())) 

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchElement search={search} handleSearchChange={handleSearchChange}/>
      <AddContactElement 
        addPerson={addPerson} 
        newContact={newContact} 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange}/>
      <SearchResultElement searchResults={searchResults} search={search}/>
      <div>Debug: {newContact.name} {newContact.number}</div>
    </div>
  )
}

export default App

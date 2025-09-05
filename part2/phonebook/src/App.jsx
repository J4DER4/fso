import { useState, useEffect } from 'react'
import backendService from './services/backend.js'
import Notification from './components/notification.jsx'
const DisplayPersons = ({ persons, filter, onDelete }) => {
    return (
        <>
            {persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
                .map(person => (
                    <ul key={person.id}>
                        {person.name} {person.number} <button onClick={() => onDelete(person.id)}>delete</button>
                    </ul>
                ))}
        </>
    )
}

const AddPersonForm = ({ addPerson, handleNameChange, newName, handleNumberChange, newNumber }) => {
    return (
        <form onSubmit={addPerson}>
            <div>
                name: <input onChange={handleNameChange} value={newName} />
                <br />
                number: <input onChange={handleNumberChange} value={newNumber} />
                <br />
                <button type="submit">add</button>
            </div>
        </form>
    )
}

const FilterElement = ({ handleFilterChange, filter }) => {
    return (
        <div>
            <p>Filter shown</p>
            < input onChange={handleFilterChange} value={filter} />
        </div>
    )
}

const App = () => {

    const hook = () => {
        backendService.getAll().then(res => {
            console.log(res)
            setPersons(res)
        })
    }
    useEffect(hook, [])

    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')
    const [notificationMsg, setNotificationMsg] = useState(null)
    const [errorMsg, setErrorMsg] = useState(null)

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }
    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }
    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

    const addPerson = (event) => {
        event.preventDefault()

        const newPersonObject = {
            name: newName,
            number: newNumber,
        }
        const personExists = persons.some(
            p => p.name.trim().toLowerCase() === newName.trim().toLowerCase()
        )
        if (personExists) {
            if (window.confirm('Name "' + newName + '" already in a list! Would you like to overwrite their number?')) {
                const person = persons.find(p => p.name === newName)

                backendService.update(person.id, newPersonObject).then(updatedPerson => {
                    setPersons(persons.map(p => p.id === person.id ? updatedPerson : p))
                })
            }
        } else {
            backendService
                .create(newPersonObject)
                .then(newPerson => {
                    setNotificationMsg('Added ' + newPerson.name)
                    setTimeout(() => { setNotificationMsg(null) }, 5000)

                    setPersons(persons.concat(newPerson))
                    setNewName('')
                    setNewNumber('')
                })

        }
    }

    const deletePerson = id => {
        const name = persons.find(p => p.id === id).name
        console.log(id, name)
        if (window.confirm('Delete ' + name + ' ?')) {
            backendService
                .deleteEntry(id)
                .catch(error => {
                    console.log(error)
                    setErrorMsg('Information of ' + name + ' has already been deleted from the server')
                    setTimeout(() => setErrorMsg(null), 5000)


                })
            setPersons(persons.filter(p => p.id !== id))
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification className={"error"} message={errorMsg} />
            <Notification className={"notif"} message={notificationMsg} />

            <FilterElement filter={filter} handleFilterChange={handleFilterChange} />

            <h2>add a new</h2>
            <AddPersonForm addPerson={addPerson} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} newName={newName} newNumber={newNumber} />

            <h2>Numbers</h2>
            <DisplayPersons persons={persons} filter={filter} onDelete={deletePerson} />
        </div>
    )
}

export default App

export const SearchResultElement = ({searchResults, search}) => {
  return (
    <div>
      <h2>Search Results</h2>
      <h2>{search !== '' ? "Search results" : "All numbers"}</h2>
      <ul>
        {searchResults.map(person => 
          <li key={person.name}>{person.name} {person.number}</li>)}
      </ul>
    </div>
  )
}
export const SearchElement = ({search, handleSearchChange}) => {
  return (
    <div>
      <h2>Search</h2>
      By name: <input value={search} onChange={handleSearchChange}/>
    </div>
  )
}
export const AddContactElement = ({addPerson, newContact, handleNameChange, handleNumberChange}) => {
  return (
    <form onSubmit={addPerson}>
      <h2>Add a new contact</h2>
      <div>
        name: <input value={newContact.name} onChange={handleNameChange} />
        <br/>
        number: <input value={newContact.number} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

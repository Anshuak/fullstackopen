import { useState } from "react";

const Filter = ({ handleFilter, filter }) => (
  <div>
    filter shown with: <input onChange={handleFilter} value={filter} />
  </div>
);

const PersonForm = ({
  handleNameChange,
  newName,
  handleNumberChange,
  newNumber,
  handleAddContact,
}) => {
  return (
    <form>
      <div>
        name: <input onChange={handleNameChange} value={newName} />
      </div>
      <div>
        number: <input onChange={handleNumberChange} value={newNumber} />
      </div>
      <div>
        <button type="submit" onClick={handleAddContact}>
          add
        </button>
      </div>
    </form>
  );
};

const Persons = ({ show }) => {
  return (
    <>
      {show.map((person) => (
        <Person key={person.name} name={person.name} number={person.number} />
      ))}
    </>
  );
};

const Person = ({ name, number }) => (
  <p>
    {name} {number}
  </p>
);

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const handleNameChange = (e) => setNewName(e.target.value);
  const handleNumberChange = (e) => setNewNumber(e.target.value);

  const handleAddContact = (e) => {
    e.preventDefault();
    if (persons.find(({ name }) => name === newName))
      return alert(`${newName} is already added to phonebook`);
    setPersons([...persons, { name: newName, number: newNumber }]);
    setNewName("");
    setNewNumber("");
  };

  const handleFilter = (e) => setFilter(e.target.value);

  const show =
    filter === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter} filter={filter} />
      <h3>add a new</h3>
      <PersonForm
        handleNameChange={handleNameChange}
        newName={newName}
        handleNumberChange={handleNumberChange}
        newNumber={newNumber}
        handleAddContact={handleAddContact}
      />
      <h3>Numbers</h3>
      <Persons show={show} />
    </div>
  );
};

export default App;

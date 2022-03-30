import { useState, useEffect } from "react";
import axios from "axios";

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
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

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

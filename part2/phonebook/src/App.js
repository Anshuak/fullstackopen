import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personService
      .getAll()
      .then((response) => {
        setPersons(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleNameChange = (e) => setNewName(e.target.value);
  const handleNumberChange = (e) => setNewNumber(e.target.value);

  const handleAddContact = (e) => {
    e.preventDefault();
    let pdata = persons.find(({ name }) => name === newName);
    if (
      pdata &&
      window.confirm(
        `${newName} is already added to phonebook. replace the old number with a new one?`
      )
    ) {
      personService
        .update(pdata.id, { ...pdata, number: newNumber })
        .then((response) =>
          setPersons(
            persons.map((person) =>
              person.id === pdata.id ? response : person
            )
          )
        )
        .catch((err) => console.log(err));
    }

    if (!pdata) {
      personService
        .create({ name: newName, number: newNumber })
        .then((response) => setPersons([...persons, response]))
        .catch((err) => console.log(err));
    }
    setNewName("");
    setNewNumber("");
  };

  const handleFilter = (e) => setFilter(e.target.value);

  const handleDeleteContact = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      personService
        .deletePerson(id)
        .then((response) => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((err) => console.log(err));
    }
  };

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
      <Persons show={show} handleDeleteContact={handleDeleteContact} />
    </div>
  );
};

export default App;

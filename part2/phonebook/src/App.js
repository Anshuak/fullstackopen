import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState(null);

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
        .then((response) => {
          setPersons(
            persons.map((person) =>
              person.id === pdata.id ? response : person
            )
          );
          setNotification({
            message: `Phone number of ${newName} is successfully updated`,
            isError: false,
          });
        })
        .catch((err) => {
          console.log(err);
          setNotification({
            message: `Updation Failed. ${newName}'s phone number is not updated`,
            isError: true,
          });
        });
    }

    if (!pdata) {
      personService
        .create({ name: newName, number: newNumber })
        .then((response) => {
          setPersons([...persons, response]);
          setNotification({ message: `Added ${newName}`, isError: false });
        })
        .catch((err) => {
          console.log(err);
          setNotification({
            message: `Contact "${newName}" saving failed"`,
            isError: true,
          });
        });
    }
    setNewName("");
    setNewNumber("");
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleFilter = (e) => setFilter(e.target.value);

  const handleDeleteContact = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      personService
        .deletePerson(id)
        .then((response) => {
          setPersons(persons.filter((person) => person.id !== id));
          setNotification({
            message: `Information of ${name} has been successfully deleted from the server`,
            isError: false,
          });
        })
        .catch((err) => {
          console.log(err);
          setNotification({
            message: `Deletion failed... Information of ${name} is not deleted from the server`,
            isError: true,
          });
        });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
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
      <Notification notification={notification} />
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

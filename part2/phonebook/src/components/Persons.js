import React from "react";
import Person from "./Person";

const Persons = ({ show, handleDeleteContact }) => {
  return (
    <>
      {show.map((person) => (
        <Person
          key={person.name}
          name={person.name}
          number={person.number}
          id={person.id}
          handleDeleteContact={handleDeleteContact}
        />
      ))}
    </>
  );
};
export default Persons;

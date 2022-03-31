import React from "react";

const Person = ({ name, number, id, handleDeleteContact }) => {
  const callDelete = (e) => {
    e.preventDefault();
    handleDeleteContact(id, name);
  };
  return (
    <p>
      {name} {number}
      <button onClick={callDelete}>Delete</button>
    </p>
  );
};

export default Person;

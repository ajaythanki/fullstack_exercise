/*
==================================================
Exercises 2.6.-2.10. starts
exercise: 2.6: The Phonebook Step1
exercise: 2.7: The Phonebook Step2
exercise: 2.8: The Phonebook Step3
exercise: 2.9*: The Phonebook Step4
exercise: 2.10: The Phonebook Step5

==================================================
*/

import { useState } from "react";
import AddNew from "./components/AddNew";
import Filter from "./components/Filter";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filteredData, setFilteredData] = useState("");
  const [showAll, setShowAll] = useState(true);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const isExist = persons.some((elem) => elem.name === newName);
    if (isExist) return alert(`${newName} is already added to phonebook`);
    setPersons(persons.concat({ name: newName, number: newNumber }));
    setNewName("");
    setNewNumber("");
  };
  const personsToShow = showAll
    ? persons
    : persons.filter((person) =>
        person.name.toLowerCase().includes(filteredData.toLowerCase())
      );

  const newNameHandler = (e) => {
    setNewName(e.target.value);
  };

  const newNumberHandler = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFilter = (e) => {
    console.log(e.target.value);
    setFilteredData(e.target.value);
    setShowAll(!showAll);
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filteredData={filteredData} handleFilter={handleFilter} />
      <AddNew
        onSubmitHandler={handleOnSubmit}
        newName={newName}
        newNameHandler={newNameHandler}
        newNumber={newNumber}
        newNumberHandler={newNumberHandler}
      />
      <Persons personsToShow={personsToShow} />
    </div>
  );
};

export default App;

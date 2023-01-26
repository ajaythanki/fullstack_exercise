/*
==================================================
Exercises 2.6.-2.10. starts
exercise: 2.6: The Phonebook Step1
exercise: 2.7: The Phonebook Step2
exercise: 2.8: The Phonebook Step3
exercise: 2.9*: The Phonebook Step4
exercise: 2.10: The Phonebook Step5
exercise: 2.11: The Phonebook Step6

Exercises 2.12.-2.15.
exercise: 2.12: Phonebook step7
exercise: 2.13: Phonebook step8
exercise: 2.14: Phonebook step9
exercise: 2.15*: Phonebook step10

==================================================
*/

import { useState, useEffect } from "react";
import AddNew from "./components/AddNew";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import personService from "./services/person";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filteredData, setFilteredData] = useState("");
  const [showAll, setShowAll] = useState(true);

  const hook = () => {
    personService.getAll().then((initialPersons) => setPersons(initialPersons));
  };
  useEffect(hook, []);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const isExisting = persons.some((elem) => elem.name === newName);
    if (isExisting) {
      let result = persons.filter((p) => p.name === newName);
      const { name, id } = result[0];

      if (
        window.confirm(
          `${name} is already added to phonebook, replace the old number with new one?`
        )
      ) {
        personService
          .update(id, { name: name, number: newNumber })
          .then((res) => {
            const newPersons = [...persons];
            newPersons.map((person) => {
              if (person.id === res.id) person.number = res.number;
              return person;
            });
            console.log(newPersons);
            setPersons(newPersons);
          });
      }
      return;
    }
    personService
      .create({ name: newName, number: newNumber })
      .then((newObject) => {
        setPersons(persons.concat(newObject));
        setNewName("");
        setNewNumber("");
      });
  };
  const personsToShow = showAll
    ? persons
    : persons.filter((person) =>
        person.name.toLowerCase().includes(filteredData.toLowerCase())
      );
  const deleteHandler = (id) => {
    let result = persons.filter((p) => p.id === id);
    const { name } = result[0];
    if (window.confirm(`Delete ${name} ?`)) {
      personService.deletePerson(id).then((status) => {
        if (status === 200) {
          setPersons(persons.filter((p) => p.id !== id));
        } else {
          alert(`Cound not Delete ${name}`);
        }
      });
    }
  };
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
      <Persons personsToShow={personsToShow} deleteHandler={deleteHandler} />
    </div>
  );
};

export default App;

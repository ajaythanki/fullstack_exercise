import logo from './logo.svg';
import './App.css';

function App() {
import { useState } from "react";
import AddNew from "./components/AddNew";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
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
    : persons.filter((person) => person.name.toLowerCase().includes(filteredData.toLowerCase()));
  const newNameHandler = (e)=>{
    setNewName(e.target.value);
  }
  const newNumberHandler = (e)=>{
    setNewNumber(e.target.value);
  }
  const handleFilter = (e) => {
    console.log(e.target.value);
    setFilteredData(e.target.value);
    setShowAll(!showAll)
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    <div>
      <h2>Phonebook</h2>
      <Filter filteredData={filteredData} handleFilter={handleFilter}/>
      <AddNew
      onSubmitHandler={handleOnSubmit}
      newName={newName}
      newNameHandler={newNameHandler}
      newNumber={newNumber}
      newNumberHandler={newNumberHandler}
      />
      <Persons personsToShow={personsToShow}/>
    </div>
  );
}
};

export default App;

import logo from './logo.svg';
import './App.css';

function App() {
import AddNew from "./components/AddNew";
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const handleOnSubmit = (e) => {
    e.preventDefault();

    const isExist = persons.some((elem) => elem.name === newName);
    if (isExist) return alert(`${newName} is already added to phonebook`);
    setPersons(persons.concat({ name: newName, number: newNumber }));
    setNewName("");
    setNewNumber("");
  };
  const newNameHandler = (e)=>{
    setNewName(e.target.value);
  }
  const newNumberHandler = (e)=>{
    setNewNumber(e.target.value);
  }
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
      <AddNew
      onSubmitHandler={handleOnSubmit}
      newName={newName}
      newNameHandler={newNameHandler}
      newNumber={newNumber}
      newNumberHandler={newNumberHandler}
      />
    </div>
  );
}
};

export default App;

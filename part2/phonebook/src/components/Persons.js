import Person from "./Person";

const Persons = ({ personsToShow, deleteHandler }) => {
  return (
    <div>
      <h2>Numbers</h2>
      <div>
        {personsToShow.map((person) => (
          <Person
            key={person.id}
            person={person}
            deleteHandler={deleteHandler}
          />
        ))}
      </div>
    </div>
  );
};

export default Persons;

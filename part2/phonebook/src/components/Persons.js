import Person from "./Person";

const Persons = ({ personsToShow }) => {
  return (
    <div>
      <h2>Numbers</h2>
      <div>
        {personsToShow.map((person) => (
          <Person key={person.id} person={person} />
        ))}
      </div>
    </div>
  );
};

export default Persons;

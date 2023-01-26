const Person = ({ person, deleteHandler }) => (
  <p>
    {person.name} : {person.number}{" "}
    <button onClick={() => deleteHandler(person.id)}>Delete</button>
  </p>
);
export default Person;

const Notes = ({ note,isImportant, toggleImportance }) => {
  const label = isImportant ? "make not important" : "make important";

  return (
    <li>
      {note} <button onClick={toggleImportance}>{label}</button>
    </li>
  );
};
export default Notes;

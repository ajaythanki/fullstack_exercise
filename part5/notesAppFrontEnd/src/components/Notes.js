const Notes = ({ note, isImportant, toggleImportance }) => {
  const label = isImportant ? "make not important" : "make important";

  return (
    <li className="note">
      <span>{note}</span> <button onClick={toggleImportance}>{label}</button>
    </li>
  );
};
export default Notes;

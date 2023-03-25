const NoteForm = ({ addNote, newNote, handleNoteChange }) => (
  <form onSubmit={addNote}>
    <input value={newNote} onChange={(event) => handleNoteChange(event)} />
    <button type="submit">save</button>
  </form>
);

export default NoteForm;

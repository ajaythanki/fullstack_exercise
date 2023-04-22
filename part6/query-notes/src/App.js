import { useQuery, useMutation, useQueryClient } from "react-query";
import { getNotes, createNote, updateNote } from "./services/requests";

const App = () => {
  const queryClient = useQueryClient();

  const newNoteMutation = useMutation(createNote, {
    onSuccess: (newNote) => {
      const notes = queryClient.getQueryData('notes')
      queryClient.setQueryData('notes', notes.concat(newNote));
    },
  });
  const updateNoteMutation = useMutation(updateNote, {
    onSuccess: (updatedNote) => {
      const notes = queryClient.getQueryData("notes");
      const updatedNotes = notes.map(note=>{
        return note.id === updatedNote.id ? updatedNote : note
      })
      queryClient.setQueryData('notes', updatedNotes);
    },
  });

  const result = useQuery("notes", getNotes, { refetchOnWindowFocus: false });
  console.log(result);

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  const addNote = async (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = "";
    newNoteMutation.mutate({ content, important: true });
  };

  const toggleImportance = (note) => {
    updateNoteMutation.mutate({...note, important: !note.important })
  }

  const notes = result.data;

  return (
    <div>
      <h2>Notes app</h2>
      <form onSubmit={addNote}>
        <input name="note" />
        <button type="submit">add</button>
      </form>
      {notes.map((note) => (
        <li style={{cursor:"pointer"}} key={note.id} onClick={() => toggleImportance(note)}>
          {note.content}
          <strong> {note.important ? "important" : ""}</strong>
        </li>
      ))}
    </div>
  );
};

export default App;

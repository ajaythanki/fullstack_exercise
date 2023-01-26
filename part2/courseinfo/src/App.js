/*
==================================================
Exercises 2.1.-2.5. starts
exercise: 2.1: course information step6
exercise: 2.2: Course information step7
exercise: 2.3*: Course information step8
exercise: 2.4: Course information step9
exercise: 2.5: separate module course
==================================================
*/
import Notes from "./components/Notes";
import noteService from "./services/notes"
import Courses from "./components/Courses";
import { useState, useEffect } from "react";
const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("a new note...");
  const [showAll, setShowAll] = useState(true);
  
  const hook = () => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  };
  useEffect(hook, [])

  const courses = [
    {
      id: 1,
      name: "Half Stack application development",
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)

  const toggleImportanceOf = (id) => {
    let note = notes.find(n => n.id === id)
    note.important = !note.important;
    // const changedNote = { ...note, important: !note.important }
    noteService
    .update(id, note).then(returnedNote  => {
      setNotes(notes.map(n => n.id !== id ? n : returnedNote))
    })
  }
  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      // id: notes.length + 1,
    };
    noteService.create(noteObject)
    .then(returnedNote => {
      setNotes(notes.concat(returnedNote));
      setNewNote("");
    })
  };
  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  };

  return (
    <div>
      <div>
        <h1>Notes</h1>
        <div>
          <button onClick={() => setShowAll(!showAll)}>
            show {showAll ? 'important' : 'all' }
          </button>
        </div>
        <ul>
          {notesToShow.map((note) => (
            <Notes key={note.id} isImportant={note.important} toggleImportance={() => toggleImportanceOf(note.id)} note={note.content} />
          ))}
        </ul>
        <form onSubmit={addNote}>
          <input value={newNote} onChange={handleNoteChange} />
          <button type="submit">Save</button>
        </form>
      </div>
      {courses.map((course) => (
        <Courses key={course.id} course={course} />
      ))}
    </div>
  );
};

export default App;

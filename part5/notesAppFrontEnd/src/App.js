/*
==================================================

==================================================
*/
import Notes from "./components/Notes";
import noteService from "./services/notes";
import { useState, useEffect } from "react";
import Notification from "./components/Notification";
import Footer from "./components/Footer";
import loginService from "./services/login";
import NoteForm from "./components/NoteForm";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("a new note...");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 
      noteService.setToken(user.token)
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log(exception);
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };
  const hook = () => {
    noteService.getAll().then((initialNotes) => setNotes(initialNotes));
  };
  useEffect(hook, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const handleLogout = (event)=>{
    event.preventDefault();
    window.localStorage.removeItem('loggedNoteappUser');
    setUser('');
  }

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  const toggleImportanceOf = (id) => {
    let note = notes.find((n) => n.id === id);
    note.important = !note.important;
    // const changedNote = { ...note, important: !note.important }
    noteService
      .update(id, note)
      .then((returnedNote) => {
        setNotes(notes.map((n) => (n.id !== id ? n : returnedNote)));
      })
      .catch((error) => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };
  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    };
    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
      setNewNote("");
    });
  };
  const handleNoteChange = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    setNewNote(event.target.value);
  };
  const handleUsername = (event) => {
    event.preventDefault();

    console.log(event.target.value);
    setUsername(event.target.value);
  };
  const handlePassword = (event) => {
    event.preventDefault();

    setPassword(event.target.value);
  };

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      {!user && (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          handleUsername={handleUsername}
          handlePassword={handlePassword}
        />
      )}
      {user && (
        <div>
          <p>{user.name} logged in <button onClick={handleLogout}>Log out</button></p>
          {
            <NoteForm
              addNote={addNote}
              newNote={newNote}
              handleNoteChange={handleNoteChange}
            />
          }
        </div>
      )}
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Notes
            key={note.id}
            isImportant={note.important}
            toggleImportance={() => toggleImportanceOf(note.id)}
            note={note.content}
          />
        ))}
      </ul>
      <Footer />
    </div>
  );
};

export default App;
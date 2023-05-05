/*
Exercises 7.1.-7.3.
7.1: routed anecdotes, step1
7.2: routed anecdotes, step2
7.3: routed anecdotes, step3

Exercises 7.4.-7.8.
7.4: anecdotes and hooks step1
7.5: anecdotes and hooks step2
7.6: anecdotes and hooks step3

*/

import { useState } from "react";
import Menu from "./components/Menu";
import AnecdoteList from "./components/AnecdoteList";
import About from "./components/About";
import CreateNew from "./components/CreateNew";
import Footer from "./components/Footer";

import { Route, Routes, useMatch } from "react-router-dom";
import Anecdote from "./components/Anecdote";
import Notification from "./components/Notification";

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: 1,
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: 2,
    },
  ]);
  const [notification, setNotification] = useState({
    message:"",
    msgType:""
  });

  const match = useMatch("/anecdote/:id");
  const anecdote = match
    ? anecdotes.find((anecdote) => anecdote.id === Number(match.params.id))
    : null;

  const showNotification = (message, type="Success") => {
    setNotification({ message, msgType: type });
    setTimeout(() => {
      setNotification("");
    }, 5000);
  };

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
    showNotification(`A new anecdote '${anecdote.content}' created!`);
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Notification message={notification.message} msgType={notification.msgType} />
      <Menu />
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/create" element={<CreateNew addNew={addNew} />} />
        <Route
          path="/"
          element={<AnecdoteList anecdotes={anecdotes} vote={vote} />}
        />
        <Route
          path="/anecdote/:id"
          element={
            <Anecdote anecdote={anecdote} vote={() => vote(anecdote.id)} />
          }
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;

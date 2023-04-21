/*
Exercises 6.3.-6.8.
6.3: anecdotes, step1
6.4: anecdotes, step2
6.5: anecdotes, step3
6.6: anecdotes, step4
6.7: anecdotes, step5
6.8: anecdotes, step6
6.9 Better anecdotes, step7

Exercises 6.10.-6.13.
6.10 Better anecdotes, step8
6.11 Better anecdotes, step9
6.12 Better anecdotes, step10
6.13 Better anecdotes, step11

Exercises 6.14.-6.15.
6.14 Anecdotes and the backend, step1
6.15 Anecdotes and the backend, step2

Exercises 6.16.-6.19.
6.16 Anecdotes and the backend, step3
6.17 Anecdotes and the backend, step4
6.18 Anecdotes and the backend, step5
6.19 Anecdotes and the backend, step6
*/

import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Notification from "./components/Notification";
import { useEffect } from "react";
import { initializeAnecdotes } from "./reducers/anecdoteReducer";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(initializeAnecdotes());
  }, [dispatch]);
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;

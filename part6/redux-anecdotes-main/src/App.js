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


*/
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Notification from "./components/Notification";

const App = () => {
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
/*
Exercises 6.3.-6.8.
6.3: anecdotes, step1
6.4: anecdotes, step2
6.5: anecdotes, step3
6.6: anecdotes, step4
6.7: anecdotes, step5
6.8: anecdotes, step6
6.9 Better anecdotes, step7

*/
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
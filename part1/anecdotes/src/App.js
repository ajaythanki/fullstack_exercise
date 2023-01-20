import { useState } from 'react'
/*
==================================================
Exercises 1.12*-1.14. starts

exercise: 1.12*: anecdotes step1
exercise: 1.13*: anecdotes step2
exercise: 1.14*: anecdotes step3
==================================================
*/
const HighestVoted = ({votes, anecdotes})=>{
  // let sortedVotes = [...votes];
  const max = Math.max(...votes);
  const maxVotedIndex = votes.findIndex((elem) => elem === max);
  const maxVotedAnecdotes = anecdotes[maxVotedIndex]
  return (
    <div>
      <h1>Anecdote with most votes</h1>
      <p>{maxVotedAnecdotes}</p>
      <p>has {max} votes</p>
    </div>
      )
}
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(8).fill(0))
  const increaseVote = ()=>{
    let newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
    console.log(votes)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={increaseVote}>Vote</button>
      <button onClick={() => setSelected(Math.floor(Math.random() * (anecdotes.length)))}>Next anecdotes</button>
      <HighestVoted votes={votes} anecdotes={anecdotes}/>
    </div>
  )
}

export default App

/*
==================================================
Exercises 1.12*-1.14. finish

exercise: 1.12*: anecdotes step1
exercise: 1.13*: anecdotes step2
exercise: 1.14*: anecdotes step3
==================================================
*/
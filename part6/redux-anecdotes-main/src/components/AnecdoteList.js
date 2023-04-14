import { useDispatch, useSelector } from "react-redux";
import { incrementVote } from "../reducers/anecdoteReducer";

const Anecdote = ({anecdote, vote})=>{
  return(<div key={anecdote.id}>
    <div>{anecdote.content}</div>
    <div>
      has {anecdote.votes}
      <button onClick={() => vote(anecdote.id)}>vote</button>
    </div>
  </div>);
}

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes);
  const vote = (id) => {
    dispatch(incrementVote(id));
  };
  return (
    <>
      {sortedAnecdotes.map((anecdote) => (
        <Anecdote anecdote={anecdote} vote={vote} key={anecdote.id} />
      ))}
    </>
  );
};

export default AnecdoteList;

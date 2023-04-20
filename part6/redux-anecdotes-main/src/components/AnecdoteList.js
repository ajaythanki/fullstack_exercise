import { useDispatch, useSelector } from "react-redux";
import { incrementVote } from "../reducers/anecdoteReducer";
import Filter from "./Filter";
import { notify } from "../reducers/notificationReducer";
import anecdoteService from "../services/anecdotes";

const Anecdote = ({ anecdote, vote }) => {
  return (
    <div style={{ marginTop: 10, marginBottom: 10 }} key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id)}>vote</button>
      </div>
    </div>
  );
};

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    // console.log(filter);
    return filter === "ALL" || filter === ""
      ? anecdotes
      : anecdotes.filter((anecdote) => {
          return anecdote.content.toLowerCase().includes(filter.toLowerCase());
        });
  });
  const dispatch = useDispatch();

  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes);
  const vote = async (id) => {
    const anecdote = sortedAnecdotes.find((anecdote) => anecdote.id === id);
    
    const updatedAnecdote = await anecdoteService.update({
      ...anecdote,
      votes: anecdote.votes + 1,
    });

    dispatch(incrementVote(updatedAnecdote.id));
    dispatch(notify(`You voted '${updatedAnecdote.content}'`));
    setTimeout(() => {
      dispatch(notify(""));
    }, 3000);
  };
  return (
    <>
      <Filter />
      {sortedAnecdotes.map((anecdote) => (
        <Anecdote anecdote={anecdote} vote={vote} key={anecdote.id} />
      ))}
    </>
  );
};

export default AnecdoteList;

import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { notify } from "../reducers/notificationReducer";
import anecdoteService from "../services/anecdotes";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const createNewAnecdote = async (e) => {
    e.preventDefault();
    const anecdote = e.target.anecdote.value;
    if (anecdote) {
      e.target.anecdote.value = "";
      dispatch(notify(`Added '${anecdote}'`));
      setTimeout(() => {
        dispatch(notify(""));
      }, 3000);
      const newAnecdote = await anecdoteService.createNew(anecdote);
      dispatch(createAnecdote(newAnecdote));
    }
  };
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={createNewAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;

import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { notify } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const createNewAnecdote = async (e) => {
    e.preventDefault();
    const anecdote = e.target.anecdote.value;
    if (anecdote) {
      e.target.anecdote.value = "";
      dispatch(notify(`Added '${anecdote}'`));
      dispatch(createAnecdote(anecdote));
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

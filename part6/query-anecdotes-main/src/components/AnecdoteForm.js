import { useMutation, useQueryClient } from "react-query";
import { createAnecdote } from "../requests";
import { useNotificationDispatch } from "../NotificationContext";

const AnecdoteForm = () => {
  const notificationDispatch = useNotificationDispatch();
  const queryClient = useQueryClient();
  const createAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData("anecdotes");
      // console.log(anecdotes);
      queryClient.setQueryData("anecdotes", anecdotes.concat(newAnecdote));
    },
    onError: error=>{
      notificationDispatch({
        type: "SET_NOTIFICATION",
        payload: `Error: '${error.response.data.error}'`,
      });
      setTimeout(() => {
        notificationDispatch({ type: "SET_NOTIFICATION", payload: "" });
      }, 5000);
    }
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    createAnecdoteMutation.mutate({ content, votes: 0 }, {
      onSuccess: newAnecdote=>{
        notificationDispatch({
          type: "SET_NOTIFICATION",
          payload: `New '${newAnecdote.content}' is created.`,
        });
        setTimeout(() => {
          notificationDispatch({ type: "SET_NOTIFICATION", payload: "" });
        }, 5000);
      }
    });
    console.log("new anecdote");
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;

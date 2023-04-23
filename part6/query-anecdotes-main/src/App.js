/*
Exercises 6.20.-6.22.
Exercise 6.20
Exercise 6.21
Exercise 6.22

Exercises 6.23.-6.24.
Exercise 6.23.
Exercise 6.24.
*/



import { useMutation, useQuery, useQueryClient } from "react-query";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { getAnecdotes, updateAnecdote } from "./requests";
import { useNotificationDispatch } from "./NotificationContext";
const App = () => {
  const notificationDispatch = useNotificationDispatch();

  const queryClient = useQueryClient();
  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData("anecdotes");
      const updatedAnecdotes = anecdotes.map((anecdote) => {
        return anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote;
      });
      queryClient.setQueryData("anecdotes", updatedAnecdotes);
    },
  });
  

  const result = useQuery("anecdotes", getAnecdotes, {
    refetchOnWindowFocus: false,
    onError: error => console.log(error),
    onSuccess: console.log("onSuccess"),
    retry: 1
  });
  // console.log(result);

  const handleVote = (anecdote) => {
    console.log("vote", anecdote);
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    notificationDispatch({
      type: "SET_NOTIFICATION",
      payload: `You Voted '${anecdote.content}'`,
    });
    setTimeout(() => {
      notificationDispatch({ type: "SET_NOTIFICATION", payload: "" });
    }, 5000);
  };

  if (result.isLoading) {
    return <h3>loding...</h3>;
  }
  if (result.isError) {
    return (
      <h3>
        Error: anecdote service not available due to problems in server. <br />
        <span>Error Message: {result.error.message}</span>
      </h3>
    );
  }
  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;

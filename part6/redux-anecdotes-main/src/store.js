import anecdotesReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer';

const store = configureStore({
  reducer:{
    anecdotes: anecdotesReducer,
    filter: filterReducer,
    message: notificationReducer
  }
});
store.subscribe(() => console.log(store.getState()));

export default store;
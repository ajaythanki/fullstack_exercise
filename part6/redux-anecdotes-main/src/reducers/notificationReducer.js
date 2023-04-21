import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
  },
});

export const { setNotification } = messageSlice.actions;

export const notify = (message, timeout = 3) => {
  return async (dispatch) => {
    dispatch(setNotification(message));
    setTimeout(() => {
      dispatch(setNotification(""));
    }, timeout * 1000);
  };
};

export default messageSlice.reducer;

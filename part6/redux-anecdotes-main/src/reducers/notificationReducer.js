import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",
  initialState: null,
  reducers: {
    notify(state, action) {
      return action.payload;
    },
  },
});

export const { notify } = messageSlice.actions;
export default messageSlice.reducer;

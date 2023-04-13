const noteReducer = (state = [], action) => {
  switch (action.type) {
    case "NEW_NOTE":
      return [...state, action.payload];
    case "TOGGLE_IMPORTANCE":
      const updatedState = state.map((note) => {
        return note.id === action.payload.id
          ? { ...note, important: !note.important }
          : note;
      });
      return updatedState;
    default:
      return state;
  }
};

export default noteReducer;
import { createSlice } from "@reduxjs/toolkit";
import noteService from "../services/notes";

// const initialState = [
//   {
//     content: 'reducer defines how redux store works',
//     important: true,
//     id: 1,
//   },
//   {
//     content: 'state of store can contain any data',
//     important: false,
//     id: 2,
//   },
// ]
// const noteReducer = (state = initialState, action) => {
//   console.log('ACTION: ', action)

//   switch (action.type) {
//     case "NEW_NOTE":
//       return [...state, action.payload];
//     case "TOGGLE_IMPORTANCE":
//       const updatedState = state.map((note) => {
//         return note.id === action.payload.id
//           ? { ...note, important: !note.important }
//           : note;
//       });
//       return updatedState;
//     default:
//       return state;
//   }
// };

// const generateId = () => Number((Math.random() * 1000000).toFixed(0));

// export const createNote = (content) => {
//   return {
//     type: "NEW_NOTE",
//     payload: {
//       content,
//       important: false,
//       id: generateId(),
//     },
//   };
// };

// export const toggleImportanceOf = (id) => {
//   return {
//     type: "TOGGLE_IMPORTANCE",
//     payload: { id },
//   };
// };

const noteSlice = createSlice({
  name: "notes",
  initialState: [],
  reducers: {
    
    toggleImportanceOf(state, action) {
      const updatedState = state.map((note) => {
        return note.id === action.payload
          ? { ...note, important: !note.important }
          : note;
      });
      console.log(JSON.parse(JSON.stringify(updatedState)));

      return updatedState;
    },
    appendNote(state, action) {
      state.push(action.payload);
    },
    setNotes(state, action) {
      return action.payload;
    },
  },
});

export const { toggleImportanceOf, appendNote, setNotes } =
  noteSlice.actions;

export const initializeNotes = () => {
  return async (dispatch) => {
    const notes = await noteService.getAll();
    dispatch(setNotes(notes));
  };
};

export const createNote =(content)=> {
  return async dispatch => {
    const newNote = await noteService.createNew(content);
    dispatch(appendNote(newNote));
  }
};

export default noteSlice.reducer;

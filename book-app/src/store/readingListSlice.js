import { createSlice } from '@reduxjs/toolkit'; // This is a function that simplifies store configuration and includes good defaults.

// `initialState` is an object that defines the initial state for the reading list slice. It starts with an empty array `readingList`.
const initialState = {
    readingList: [],
};

// createSlice is called with an object containing:
// name: A string that serves as the prefix for generated action types.
// initialState: The initial state for this slice.
// reducers: An object defining reducer functions and corresponding actions. 
export const readingListSlice = createSlice({
  name: 'readingList',
  initialState,
  reducers: { // There are two reducers, addToReadingList and removeFromReadingList.
    addToReadingList: (state, action) => { // Takes the current state and an action.
      // Checks if the book with the specified id in the action payload already exists in the reading list.
      const existingIndex = state.readingList.findIndex(
        (book) => book.id === action.payload.id
      );
      // If it does not exist (existingIndex === -1), it adds the book to the reading list.
      if (existingIndex === -1) {
        state.readingList.push(action.payload);
      // If it does exist, it removes the book from the reading list.
      } else {
        state.readingList.splice(existingIndex, 1);
      }
    },
    // Updates the reading list by filtering out the book with the specified id in the action payload.
    removeFromReadingList: (state, action) => {
      state.readingList = state.readingList.filter(
        (book) => book.id !== action.payload // In this reducer function, action is the argument representing the dispatched action. The action.payload is used to access the data associated with the action.
      );
    },
  },
});

// Extracts the addToReadingList action creator from the readingListSlice.actions object. This allows us to directly import and use this action creator in other parts of our application.
export const { addToReadingList } = readingListSlice.actions;
// Exports the reducer function generated by createSlice for the reading list slice. This reducer is used when configuring the Redux store.
export default readingListSlice.reducer;
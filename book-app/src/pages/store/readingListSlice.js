import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  readingList: JSON.parse(localStorage.getItem('readingList')) || [],
};

export const readingListSlice = createSlice({
  name: 'readingList',
  initialState,
  reducers: {
    addToReadingList: (state, action) => {
      const existingIndex = state.readingList.findIndex(
        (book) => book.id === action.payload.id
      );
      if (existingIndex === -1) {
        state.readingList.push(action.payload);
      }
    },
    removeFromReadingList: (state, action) => {
      state.readingList = state.readingList.filter(
        (book) => book.id !== action.payload
      );
    },
  },
});

export const { addToReadingList, removeFromReadingList } = readingListSlice.actions;
export default readingListSlice.reducer;
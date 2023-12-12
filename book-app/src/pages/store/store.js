import { configureStore } from "@reduxjs/toolkit";
import bookReducer from './bookSlice';
import readingListReducer from './readingListSlice';

export const store = configureStore({
  reducer: {
    books: bookReducer,
    readingList: readingListReducer,
  },
});

export default store;
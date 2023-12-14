import { configureStore } from "@reduxjs/toolkit";
import bookReducer from './bookSlice';
import readingListReducer from './readingListSlice';

const store = configureStore({
  reducer: {
    books: bookReducer,
    readingList: readingListReducer,
  },
});

export default store;
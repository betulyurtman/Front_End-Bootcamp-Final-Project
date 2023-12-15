import { configureStore } from "@reduxjs/toolkit"; // This is a function that simplifies store configuration and includes good defaults.
import bookReducer from './bookSlice';
import readingListReducer from './readingListSlice';

// Current redux application state lives in an object called the store.
// The store is created by passing in a reducer. 
// A redux store runs the root reducer whenever an action is dispatched.
// configureStore accepts an object with configuration options.
// bookReducer and readingListReducer are reducer functions that handle state changes in response to dispatched actions.
const store = configureStore({
  reducer: {
    books: bookReducer,
    readingList: readingListReducer,
  },
});

export default store;
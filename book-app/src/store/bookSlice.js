import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'; // Functions for creating asynchronous thunks and slices.
import axios from 'axios'; // Library for making HTTP requests.

// Initial state of the Redux slice
const initialState = {
  books: [],
  loadingBooks: false,
  error: null,
  searchResults: [],
  loadingSearch: false,
  updatingBook: false,
  addingBook: false,
};

// Async thunk for fetching books
// Defines an asynchronous thunk fetchBooks using createAsyncThunk. Fetches books from the mock API I have created and returns the data.
export const fetchBooks = createAsyncThunk(
    'books/fetchBooks',
    async () => {
      const response = await axios.get('https://6578bfbbf08799dc8045fadc.mockapi.io/api/books');
      return response.data;
    }
  );  

// Async thunk for updating book details
// Defines an asynchronous thunk updateBookDetails using createAsyncThunk. Updates book details on a mock API, then dispatches fetchBooks to update the state.
export const updateBookDetails = createAsyncThunk(
  'books/updateBookDetails',
  async (bookDetails, { dispatch }) => {
    const response = await axios.put(`https://6578bfbbf08799dc8045fadc.mockapi.io/api/books/${bookDetails.id}`, bookDetails);
    dispatch(fetchBooks()); // Refetching books to update the state with the latest data.
    return response.data;
  }
);

// Async thunk for adding a new book
// Defines an asynchronous thunk addNewBook using createAsyncThunk. Adds a new book to the mock API, then dispatches fetchBooks to update the state.
export const addNewBook = createAsyncThunk(
  'books/addNewBook',
  async (bookDetails, { dispatch }) => {
    const response = await axios.post('https://6578bfbbf08799dc8045fadc.mockapi.io/api/books', bookDetails);
    dispatch(fetchBooks()); // Refetch books to update the state with the latest data
    return response.data;
  }
);

// Redux slice creation using createSlice
const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
    updateBookDetailsReducer: (state, action) => {
        const index = state.books.findIndex(book => book.id === action.payload.id);
        if (index !== -1) {
          state.books[index] = { ...state.books[index], ...action.payload };
        }
    },
    addNewBookReducer: (state, action) => {
      state.books.push(action.payload);
    },
  },
  // Uses extraReducers to handle actions dispatched by asynchronous thunks.
  // Handles pending, fulfilled, and rejected actions for fetchBooks, updateBookDetails, and addNewBook.
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loadingBooks = true;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.books = action.payload;
        state.loadingBooks = false;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loadingBooks = false;
        state.error = action.error.message;
      })
      .addCase(updateBookDetails.pending, (state) => {
        // Optionally, set a flag to indicate that an update operation is in progress
        state.updatingBook = true;
      })
      .addCase(updateBookDetails.fulfilled, (state, action) => {
        // No need to update the state here as we are refetching the books
        // Reset the updatingBook flag
        state.updatingBook = false;
      })
      .addCase(updateBookDetails.rejected, (state, action) => {
        // Handle errors
        state.error = action.error.message;
        // Reset the updatingBook flag
        state.updatingBook = false;
      })
      .addCase(addNewBook.pending, (state) => {
        // Optionally, set a flag to indicate that a book addition operation is in progress
        state.addingBook = true;
      })
      .addCase(addNewBook.fulfilled, (state) => {
        // The book list will be updated by the fetchBooks() dispatched earlier
        // Reset the addingBook flag
        state.addingBook = false;
      })
      .addCase(addNewBook.rejected, (state, action) => {
        // Handle errors
        state.error = action.error.message;
        // Reset the addingBook flag
        state.addingBook = false;
      });
  },
});

export const { setSearchResults, updateBookDetailsReducer, addNewBookReducer } = bookSlice.actions;

export const searchBooks = (searchQuery) => (dispatch, getState) => {

  // const { books } = getState().books; destructures the books array from the current state of the Redux store.
  const { books } = getState().books;

  // Clear previous search results
  dispatch(setSearchResults([]));

  // Checks if the searchQuery is either falsy or contains only whitespace after trimming. If true, the function returns early, skipping the search logic.
  if (!searchQuery || !searchQuery.trim()) {
    return;
  }

  // Converts the searchQuery to lowercase for case-insensitive matching.
  // Uses the filter method on the books array to create a new array (filteredBooks) containing only the books whose titles include the lowercased search query.
  const lowerCaseQuery = searchQuery.toLowerCase();
  const filteredBooks = books.filter(book =>
    book.title && book.title.toLowerCase().includes(lowerCaseQuery)
  );

  // Dispatch new search results
  dispatch(setSearchResults(filteredBooks));
};

export default bookSlice.reducer;
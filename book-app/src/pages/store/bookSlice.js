import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  books: [],
  loadingBooks: false,
  error: null,
  searchResults: [],
  loadingSearch: false,
  updatingBook: false,
};

export const fetchBooks = createAsyncThunk(
    'books/fetchBooks',
    async () => {
      const response = await axios.get('https://6578bfbbf08799dc8045fadc.mockapi.io/api/books');
      return response.data;
    }
  );  

export const updateBookDetails = createAsyncThunk(
  'books/updateBookDetails',
  async (bookDetails, { dispatch }) => {
    const response = await axios.put(`https://6578bfbbf08799dc8045fadc.mockapi.io/api/books/${bookDetails.id}`, bookDetails);
    dispatch(fetchBooks()); // Refetching books to update the state with the latest data.
    return response.data;
  }
);

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
    addNewBook: (state, action) => {
      state.books.push(action.payload);
    },
  },
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
      });
  },
});

export const { setSearchResults, updateBookDetailsReducer, addNewBook } = bookSlice.actions;

export const searchBooks = (searchQuery) => (dispatch, getState) => {
  const { books } = getState().books;

  // Clear previous search results
  dispatch(setSearchResults([]));

  if (!searchQuery || !searchQuery.trim()) {
    return;
  }

  const lowerCaseQuery = searchQuery.toLowerCase();
  const filteredBooks = books.filter(book =>
    book.title && book.title.toLowerCase().includes(lowerCaseQuery)
  );

  // Dispatch new search results
  dispatch(setSearchResults(filteredBooks));
};

export default bookSlice.reducer;
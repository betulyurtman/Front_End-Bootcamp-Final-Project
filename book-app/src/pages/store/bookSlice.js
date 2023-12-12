import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  books: [],
  loadingBooks: false,
  error: null,
  searchResults: [],
  loadingSearch: false,
};

export const fetchBooks = createAsyncThunk(
    'books/fetchBooks',
    async () => {
      const response = await axios.get('https://6578bfbbf08799dc8045fadc.mockapi.io/api/books');
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
      });
  },
});

export const { setSearchResults } = bookSlice.actions;

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
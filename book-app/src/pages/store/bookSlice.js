import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  books: [],
  loadingBooks: false,
  error: null,
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
  reducers: {},
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

export default bookSlice.reducer;
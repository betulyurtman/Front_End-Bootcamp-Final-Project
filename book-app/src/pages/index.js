import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from './store/bookSlice';
import { Grid } from '@mui/material';
import BookCard from './components/BookCard';

const BookList = () => {
  const dispatch = useDispatch();
  const { books, loadingBooks, error, searchResults, loadingSearch } = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const displayBooks = searchResults.length > 0 ? searchResults : books;

  if (loadingBooks || loadingSearch) return <p>Loading...</p>;
  if (error) return <p>Error occurred: {error}</p>;

  return (
    <Grid container spacing={2}>
      {displayBooks.map((book, index) => (
        <Grid item xs={12} sm={6} md={4} key={book.id || `book-${index}`}>
          <BookCard book={book} />
        </Grid>
      ))}
    </Grid>
  );
};

export default BookList;
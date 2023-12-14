import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../store/bookSlice';
import { Box, Grid, Typography } from '@mui/material';
import BookCard from '../components/BookCard';
import Slider from 'react-slick';

const BookList = () => {
  const dispatch = useDispatch();
  const { books, loadingBooks, error, searchResults, loadingSearch } = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const displayBooks = searchResults.length > 0 ? searchResults : books;

  if (loadingBooks || loadingSearch) return <p>Loading...</p>;
  if (error) return <p>Error occurred: {error}</p>;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false, 
  };

  return (
    <div>
      {/* <Typography variant="h3" component="h1" gutterBottom>
        Self Improvement Books
      </Typography> */}
      <Box sx={{ width: '100%', overflow: 'hidden' }}>
        <Slider {...settings}>
          <Box sx={{ padding: 3 }}>
            <img
              src="https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Image 1"
              style={{ width: '100%', maxWidth: 1000, height: 'auto', display: 'block', margin: 'auto' }}
            />
          </Box>
          <Box sx={{ padding: 2 }}>
            <img
              src="https://images.pexels.com/photos/2099266/pexels-photo-2099266.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Image 2"
              style={{ width: '100%', maxWidth: 1000, height: 'auto', display: 'block', margin: 'auto' }}
            />
          </Box>
          <Box sx={{ padding: 2 }}>
            <img
              src="https://images.pexels.com/photos/415078/pexels-photo-415078.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Image 3"
              style={{ width: '100%', maxWidth: 1000, height: 'auto', display: 'block', margin: 'auto' }}
            />
          </Box>
          <Box sx={{ padding: 2 }}>
            <img
              src="https://images.pexels.com/photos/159597/book-read-literature-pages-159597.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Image 4"
              style={{ width: '100%', maxWidth: 1000, height: 'auto', display: 'block', margin: 'auto' }}
            />
          </Box>
          <Box sx={{ padding: 2 }}>
            <img
              src="https://images.pexels.com/photos/2299028/pexels-photo-2299028.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Image 5"
              style={{ width: '100%', maxWidth: 1000, height: 'auto', display: 'block', margin: 'auto' }}
            />
          </Box>
        </Slider>
      </Box>
      <Typography variant="h6">
        Total Book Count: {displayBooks.length}
      </Typography>
      <Grid container spacing={2}>
        {displayBooks.map((book, index) => (
          <Grid item xs={12} sm={6} md={4} key={book.id || `book-${index}`}>
            <BookCard book={book} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default BookList;
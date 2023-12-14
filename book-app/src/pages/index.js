import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../store/bookSlice';
import { Box, Grid, Typography } from '@mui/material';
import BookCard from '../components/BookCard';
import Slider from 'react-slick';
import { Pagination } from '@mui/material';

const BookList = () => {
  const dispatch = useDispatch();
  const { books, loadingBooks, error, searchResults, loadingSearch } = useSelector((state) => state.books);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 15; 

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const displayBooks = searchResults.length > 0 ? searchResults : books;

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = displayBooks.slice(indexOfFirstBook, indexOfLastBook);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  
  // Total page count
  const pageCount = Math.ceil(displayBooks.length / booksPerPage);

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
      <Box sx={{ width: '100%', overflow: 'hidden', backgroundColor: '#FAEED1' }}>
        <Slider {...settings}>
          <Box sx={{ padding: 2 }}>
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
      
      <Box sx={{ marginY: 4 }}></Box> {/* Adding Space */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Self Improvement Books
        </Typography>
        
        <Pagination count={pageCount} page={currentPage} onChange={handlePageChange} />
      </Box>
      <Grid container spacing={6}>
        {currentBooks.map((book, index) => (
          <Grid item xs={12} sm={6} md={4} key={book.id || `book-${index}`}>
            <BookCard book={book} />
          </Grid>
        ))}
      </Grid>
      <Typography variant="h8" sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
        Total Book Count: {displayBooks.length}
      </Typography>
    </div>
  );
};

export default BookList;
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from './store/bookSlice';
import { Card, CardMedia, CardContent, Typography, Grid } from '@mui/material';
import { useRouter } from 'next/router';

const BookList = () => {
  const dispatch = useDispatch();
  const { books, loadingBooks, error } = useSelector((state) => state.books);
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  if (loadingBooks) return <p>Loading...</p>;
  if (error) return <p>Error occurred: {error}</p>;

  const handleCardClick = (bookId) => {
    router.push(`/book/${bookId}`);
  };

  return (
    <Grid container spacing={2}>
      {books.map((book) => (
        <Grid item xs={12} sm={6} md={4} key={book.id} onClick={() => handleCardClick(book.id)}>
          <Card sx={{ maxWidth: 345, '&:hover': { boxShadow: 6 } }}>
            <CardMedia
              component="img"
              height="250"
              image={book.thumbnail || '/default-book-thumbnail.jpg'}
              alt={book.title}
              sx={{ objectFit: 'contain' }}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {book.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Author: {book.author}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Page Count: {book.pageCount}
              </Typography>
              {/* <Typography variant="body2" color="text.secondary">
                Thumbnail: {book.thumbnail}
              </Typography> */}
              {/* <Typography variant="body2" color="text.secondary">
                ID: {book.id}
              </Typography> */}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default BookList;
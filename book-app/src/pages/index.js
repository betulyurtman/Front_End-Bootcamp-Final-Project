import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from './store/bookSlice';
import { Card, CardMedia, CardContent, Typography, Grid, Button } from '@mui/material';
import Link from 'next/link';

const BookList = () => {
  const dispatch = useDispatch();
  const { books, loadingBooks, error } = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  if (loadingBooks) return <p>Loading...</p>;
  if (error) return <p>Error occurred: {error}</p>;

  return (
    <Grid container spacing={2}>
      {books.map((book) => (
        <Grid item xs={12} sm={6} md={4} key={book.id}>
          <Card sx={{ maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardMedia
              component="img"
              height="250"
              image={book.thumbnail || '/default-book-thumbnail.jpg'}
              alt={book.title}
              sx={{ height: 150, objectFit: 'contain' }}
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
               <Link href={`/book/${book.id}`}>
                <Button variant="outlined" color="error">
                  Details
                </Button>
              </Link>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default BookList;
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBooks } from '../../store/bookSlice';
import { Typography, Card, CardMedia, CardContent, Grid, Box, Button, IconButton } from '@mui/material';
import Link from 'next/link';
import { Edit } from '@mui/icons-material';

const BookDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const { books, loadingBooks, error } = useSelector((state) => state.books);

  useEffect(() => {
    if (books.length === 0) {
      dispatch(fetchBooks());
    }
  }, [dispatch, books.length]);

  const book = books.find((book) => book.id === id);

  if (loadingBooks) return <p>Loading...</p>;
  if (error) return <p>Error occurred: {error}</p>;
  if (!book) return <p>Book not found</p>;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={8} md={6}>
          <Card sx={{ maxWidth: 600, margin: 'auto', marginTop: 4 }}>
          <CardMedia
              component="img"
              image={book.thumbnail || '/default-book-thumbnail.jpg'}
              alt={book.title}
              sx={{ height: 500, objectFit: 'contain' }}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" align="center">
                {book.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" align="center">
                Author: {book.author}
              </Typography>
              <Typography variant="body2" color="text.secondary" align="center">
                Page Count: {book.pageCount}
              </Typography>
              <Link href={`/edit-book/${book.id}`}>
                <Button variant="contained" color="error">
                  <IconButton color="inherit">
                    <Edit />
                  </IconButton>
                </Button>
              </Link>
            </CardContent>
        </Card>
      </Grid>
    </Grid>
    </Box>
  );
};

export default BookDetails;
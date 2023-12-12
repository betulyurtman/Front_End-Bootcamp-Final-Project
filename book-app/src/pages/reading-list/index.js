import React, { useEffect, useState } from 'react';
import { Card, Typography, Grid, CardMedia, CardContent, Box, IconButton } from '@mui/material';
import { Bookmark, BookmarkBorder } from '@mui/icons-material';

const ReadingList = () => {
  const [readingList, setReadingList] = useState([]);

  useEffect(() => {
    const storedReadingList = JSON.parse(localStorage.getItem('readingList')) || [];
    setReadingList(storedReadingList);
  }, []);

  const isBookInReadingList = (bookId) => {
    const readingList = JSON.parse(localStorage.getItem('readingList')) || [];
    return readingList.some((b) => b.id === bookId);
  };

  const handleToggleReadingList = (book) => {
    let updatedReadingList = [...readingList];
    const bookIndex = updatedReadingList.findIndex((b) => b.id === book.id);

    if (bookIndex !== -1) {
      updatedReadingList = updatedReadingList.filter((b) => b.id !== book.id);
    } else {
      updatedReadingList.push(book);
    }

    setReadingList(updatedReadingList);
    localStorage.setItem('readingList', JSON.stringify(updatedReadingList));
  };

  return (
    <Grid container spacing={2}>
      {readingList.map((book, index) => (
        <Grid item xs={12} sm={6} md={4} key={book.id || `book-${index}`}>
          <Card sx={{ position: 'relative', maxWidth: 345, '&:hover': { boxShadow: 6 }, height: '100%' }}>
            <Box sx={{ position: 'absolute', top: 0, right: 0, zIndex: 1 }}>
              <IconButton
                color="inherit"
                onClick={() => handleToggleReadingList(book)}
              >
                {isBookInReadingList(book.id) ? <Bookmark /> : <BookmarkBorder />}
              </IconButton>
            </Box>
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
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ReadingList;
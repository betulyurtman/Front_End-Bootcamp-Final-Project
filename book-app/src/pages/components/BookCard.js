import React, { useState, useEffect } from 'react';
import { Card, CardMedia, CardContent, Typography, Button, IconButton, Box } from '@mui/material';
import Link from 'next/link';
import { Bookmark, BookmarkBorder } from '@mui/icons-material';

const BookCard = ({ book, isAlreadyInReadingList }) => {
  const [isInReadingList, setIsInReadingList] = useState(isAlreadyInReadingList);

  useEffect(() => {
    const readingList = JSON.parse(localStorage.getItem('readingList')) || [];
    setIsInReadingList(readingList.some((b) => b.id === book.id));
  }, [book.id]);

  const handleAddToReadingList = () => {
    let readingList = JSON.parse(localStorage.getItem('readingList')) || [];
    const index = readingList.findIndex((b) => b.id === book.id);

    if (index !== -1) {
        readingList = readingList.filter((b) => b.id !== book.id);
    } else {
        readingList.push(book);
    }
    localStorage.setItem('readingList', JSON.stringify(readingList));
    setIsInReadingList(!isInReadingList);
  };

  return (
    <Card sx={{ position: 'relative', maxWidth: 345, '&:hover': { boxShadow: 6 }, height: '100%' }}>
      <Box sx={{ position: 'absolute', top: 0, right: 0, zIndex: 1 }}>
        <IconButton
          color="inherit"
          onClick={handleAddToReadingList}
        >
          {isInReadingList ? <Bookmark /> : <BookmarkBorder />}
        </IconButton>
      </Box>
      <CardMedia
        component="img"
        height="250"
        image={book.thumbnail || 'https://images.pexels.com/photos/3358707/pexels-photo-3358707.png'}
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
        <Link href={`/book/${book.id}`}>
          <Button variant="outlined" color="error">
            Details
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default BookCard;
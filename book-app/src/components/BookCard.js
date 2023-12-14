import React, { useEffect } from 'react';
import { Card, CardMedia, CardContent, Typography, Button, IconButton, Box } from '@mui/material';
import Link from 'next/link';
import { Bookmark, BookmarkBorder } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { addToReadingList } from '@/store/readingListSlice';

const BookCard = ({ book }) => {
    const dispatch = useDispatch();
    const readingList = useSelector((state) => state.readingList.readingList);

    
    useEffect(() => {
      const storedReadingList = JSON.parse(localStorage.getItem('readingList')) || [];
      dispatch(addToReadingList(storedReadingList));
    }, [dispatch]);
    
    useEffect(() => {
      localStorage.setItem('readingList', JSON.stringify(readingList));
    }, [readingList]);
    
    const isInReadingList = readingList.some((b) => b.id === book.id);
    
    const handleToggleReadingList = () => {
      dispatch(addToReadingList(book));
    };
    
    if (!book) {
      // Return a placeholder, loading state, or null
      return <div>Loading...</div>;
    };
    
    return (
      <Card sx={{ position: 'relative', maxWidth: 345, '&:hover': { boxShadow: 6 }, height: '100%' }}>
        <Box sx={{ position: 'absolute', top: 0, right: 0, zIndex: 1 }}>
          <IconButton color="inherit" onClick={handleToggleReadingList}>
            {isInReadingList ? <Bookmark /> : <BookmarkBorder />}
          </IconButton>
        </Box>
        <CardMedia
          component="img"
          height="250"
          image={book.thumbnail || 'https://images.pexels.com/photos/3358707/pexels-photo-3358707.png'}
          alt={book.title}
          sx={{ height: 250, objectFit: 'contain' }}
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
          <Box sx={{ marginY: 4 }}></Box> {/* Adding Space */}
          <Box sx={{ position: 'absolute', bottom: 16, right: 16 }}>
          <Link href={`/book/${book.id}`}>
            <Button variant="outlined" color="error">
              Details
            </Button>
          </Link>
          </Box>
        </CardContent>
      </Card>
    );
};

export default BookCard;
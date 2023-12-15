import React, { useEffect } from 'react'; // The Effect Hook lets us perform side effects in function components.
import { Card, CardMedia, CardContent, Typography, Button, IconButton, Box } from '@mui/material';
import Link from 'next/link';
import { Bookmark, BookmarkBorder } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { addToReadingList } from '@/store/readingListSlice';

// Defines a functional component named BookCard that takes a prop named book.
const BookCard = ({ book }) => {

    // The `dispatch` function is used to dispatch actions to the Redux store, triggering state changes.
    const dispatch = useDispatch();

    // useSelector takes a selector function as an argument, which determines what part of the state to extract.
    // The selector function receives the entire Redux state as an argument, and we can return a specific part of the state that our component is interested in. Here, state.readingList.readingList is extracting the readingList property from the Redux state.
    const readingList = useSelector((state) => state.readingList.readingList);

    // Uses the useEffect hook to run code after the component has rendered.Retrieves the reading list stored in the local storage or initializes an empty array if it doesn't exist.Dispatches an action (addToReadingList) with the stored reading list to populate the Redux state.
    useEffect(() => {
      const storedReadingList = JSON.parse(localStorage.getItem('readingList')) || [];
      dispatch(addToReadingList(storedReadingList));
    }, [dispatch]);
    
    // Handles changes to the readingList state. Updates the local storage with the current reading list whenever it changes.
    useEffect(() => {
      localStorage.setItem('readingList', JSON.stringify(readingList));
    }, [readingList]);
    
    // Checks whether the current book is in the reading list by using the `some` method on the array.
    const isInReadingList = readingList.some((b) => b.id === book.id);
    
    // Defines a function `handleToggleReadingList` that dispatches the `addToReadingList` action with the current book. This function is called when the bookmark icon is clicked, toggling the book's presence in the reading list.
    const handleToggleReadingList = () => {
      dispatch(addToReadingList(book));
    };
    
    // Checks if a `book` prop exists. If not, it returns a placeholder or loading state.
    if (!book) {
      // Returning a placeholder, loading state, or null
      return <div>Loading...</div>;
    };
    
    return (
      <Card sx={{ position: 'relative', maxWidth: 345, '&:hover': { boxShadow: 6 }, height: '100%' }}>
        {/* This box is for the bookmark button that is on the upper right of the book card. */}
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
          {/* This box is for details button that is on the below right of the book card. */}
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
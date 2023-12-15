import { Card, Typography, Grid, CardMedia, CardContent, Box, IconButton } from '@mui/material';
import { Bookmark, BookmarkBorder } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { addToReadingList } from '../../store/readingListSlice';

const ReadingList = () => {
    const dispatch = useDispatch();
    const readingList = useSelector((state) => state.readingList.readingList);

    // For bookmark(adding to or removing from the reading list) button.
    const handleToggleReadingList = (book) => {
        dispatch(addToReadingList(book));
      };

    // Creating isBookInReadingList function that checks if a book with a given bookId is in the reading list. It returns a boolean.
    const isBookInReadingList = (bookId) => {
      return readingList.some((b) => b.id === bookId);
    };

  return (
    <>
    {/* Title for the page. */}
    <Typography variant="h3" align="left" gutterBottom>
      Reading List
    </Typography>
    {/* Checking the length to show messages to the user. */}
    {readingList.length > 0 ? (
      <>
      <Typography variant="h6" align="left" gutterBottom>
          {/* Showing how many books is on the list. */}
          You have {readingList.length} books in your reading list.
      </Typography>
      <Grid container spacing={2}>
        {/* Displaying the books. */}
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
    </>
    ) : (
        // Showing a message if the list is empty.
        <Typography variant="h6" align="center" color="text.secondary">
          Your reading list is empty.
        </Typography>
      )}
    </>
  );
};

export default ReadingList;
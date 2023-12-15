import { Typography, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import BookCard from '@/components/BookCard';

const ReadingList = () => {
    const readingList = useSelector((state) => state.readingList.readingList);

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
        {readingList.map((book) => (
          <Grid item xs={12} sm={6} md={4} key={book.id}>
            <BookCard book={book} />
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
import { useDispatch, useSelector } from 'react-redux';
import { updateBookDetails } from '../../store/bookSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Button, Container, Stack, TextField, Typography } from '@mui/material';

// We can add validations using Yup.
const currentYear = new Date().getFullYear(); // Get the current year.

const BookSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    publishedDate: Yup.number()
      .integer('Published year must be an integer')
      .max(currentYear, 'Published year cannot be bigger than current year.'),
    pageCount: Yup.number()
      .integer('Page count must be an integer')
  });

const EditBook = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const book = useSelector(state => state.books.books.find(b => b.id === id));

  const getInitialValues = () => {
    if (book) {
      return {
        title: book.title || '',
        author: book.author || '',
        pageCount: book.pageCount || '',
        thumbnail: book.thumbnail || '',
      };
    }
    return {
      title: '',
      author: '',
      pageCount: '',
      thumbnail: '',
    };
  };

  const formik = useFormik({
    initialValues: getInitialValues(),
    validationSchema: BookSchema,
    enableReinitialize: true, // This reinitializes formik when initialValues changes
    onSubmit: (values) => {
      dispatch(updateBookDetails({ ...values, id }));
      router.push(`/book/${id}`);
    },
  });

  return (
    <Container>
      <Stack spacing={2}>
        <Typography variant="h4" component="h1">
          Edit Book
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="title"
            name="title"
            label="Title"
            value={formik.values.title}
            onChange={formik.handleChange}
            margin="normal"
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
            onBlur={formik.handleBlur}
          />
          <TextField
            fullWidth
            id="author"
            name="author"
            label="Author"
            value={formik.values.author}
            onChange={formik.handleChange}
            margin="normal"
            error={formik.touched.author && Boolean(formik.errors.author)}
            helperText={formik.touched.author && formik.errors.author}
            onBlur={formik.handleBlur}
          />
          <TextField
            fullWidth
            id="pageCount"
            name="pageCount"
            label="Page Count"
            type="number"
            value={formik.values.pageCount}
            onChange={formik.handleChange}
            margin="normal"
            error={formik.touched.pageCount && Boolean(formik.errors.pageCount)}
            helperText={formik.touched.pageCount && formik.errors.pageCount}
            onBlur={formik.handleBlur}
          />
          <TextField
            fullWidth
            id="thumbnail"
            name="thumbnail"
            label="Thumbnail URL"
            type="url"
            value={formik.values.thumbnail}
            onChange={formik.handleChange}
            margin="normal"
            error={formik.touched.thumbnail && Boolean(formik.errors.thumbnail)}
            helperText={formik.touched.thumbnail && formik.errors.thumbnail}
            onBlur={formik.handleBlur}
          />
          <Button color="error" variant="contained" fullWidth type="submit">
            Update Book
          </Button>
        </form>
      </Stack>
    </Container>
  );
};

export default EditBook;
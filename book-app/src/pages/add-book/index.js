import React from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addNewBook } from '../store/bookSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  author: Yup.string().required('Author is required'),
  pageCount: Yup.number().positive().integer().required('Page count is required'),
  thumbnail: Yup.string().url('Enter a valid URL').required('Image URL is required'),
});

const NewBook = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      title: '',
      author: '',
      pageCount: '',
      thumbnail: '',
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(addNewBook(values));
      formik.resetForm();
    },
  });

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Add a New Book
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          label="Title"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Author"
          name="author"
          value={formik.values.author}
          onChange={formik.handleChange}
          error={formik.touched.author && Boolean(formik.errors.author)}
          helperText={formik.touched.author && formik.errors.author}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Page Count"
          name="pageCount"
          type="number"
          value={formik.values.pageCount}
          onChange={formik.handleChange}
          error={formik.touched.pageCount && Boolean(formik.errors.pageCount)}
          helperText={formik.touched.pageCount && formik.errors.pageCount}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Image URL"
          name="thumbnail"
          value={formik.values.thumbnail}
          onChange={formik.handleChange}
          error={formik.touched.thumbnail && Boolean(formik.errors.thumbnail)}
          helperText={formik.touched.thumbnail && formik.errors.thumbnail}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Add Book
        </Button>
      </form>
    </Container>
  );
};

export default NewBook;
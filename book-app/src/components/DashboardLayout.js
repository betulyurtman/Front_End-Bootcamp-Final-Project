import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { styled, alpha } from '@mui/material/styles';
import { Stack, Typography } from '@mui/material';
import { Bookmark, MenuBook} from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { searchBooks, setSearchResults } from '@/store/bookSlice';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const DashboardLayout = ({ children }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState('');

    const handleBackClick = () => {
      router.push('/');
    };

    const handleSearch = () => {
        if (searchQuery.trim() !== '') {
          dispatch(searchBooks(searchQuery));
        } else {
            dispatch(setSearchResults([]));
        }
      };

    // Activate reading list page button. 
    const handleReadingListClick = () => {
        router.push('/reading-list');
    };

    // For add-book page.
    const handleAddBookClick = () => {
        router.push('/add-book');
    };

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: '#830E1D' }}>
        <Toolbar>
          <IconButton 
            color="inherit" 
            onClick={handleBackClick}
          >
            <MenuBook />
          </IconButton>
          <Typography 
              variant="h4" 
              component="div" 
              sx={{ flexGrow: 1, marginLeft: 50 }}
          >
              Books for Book Lovers
          </Typography>
          <Stack sx={{ flexGrow: 1 }} />
          <Search>
            <IconButton onClick={handleSearch} color="inherit">   
              <SearchIcon />
              </IconButton>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </Search>
          <IconButton color="inherit" onClick={handleAddBookClick}>
            <AddBoxIcon /> 
          </IconButton>
          <IconButton color="inherit" onClick={handleReadingListClick}>
          <Bookmark />
          </IconButton>
          <IconButton color="inherit">
            {/* <ShoppingCartIcon /> */}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Stack sx={{ padding: '20px 60px' }}>{children}</Stack>
    </>
  );
};

export default DashboardLayout;
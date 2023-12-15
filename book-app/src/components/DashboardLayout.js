import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Stack, Typography } from '@mui/material';
import { Bookmark, MenuBook} from '@mui/icons-material';
import { useRouter } from 'next/router';

const DashboardLayout = ({ children }) => {
    const router = useRouter();

    const handleBackClick = () => {
      router.push('/');
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
              sx={{ flexGrow: 1, marginLeft: 72 }}
          >
              Books for Book Lovers
          </Typography>
          <Stack sx={{ flexGrow: 1 }} />
          <IconButton color="inherit" onClick={handleAddBookClick}>
            <AddBoxIcon /> 
          </IconButton>
          <IconButton color="inherit" onClick={handleReadingListClick}>
          <Bookmark />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Stack sx={{ padding: '20px 60px' }}>{children}</Stack>
    </>
  );
};

export default DashboardLayout;
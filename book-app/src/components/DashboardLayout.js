import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Stack, Typography } from '@mui/material';
import { Bookmark, MenuBook} from '@mui/icons-material';
import { useRouter } from 'next/router'; // Is a hook that allows functional components to access the Next.js router object. It provides information about the current route, enables programmatic navigation, and allows you to listen to events related to route changes. 

// Declares a functional component named `DashboardLayout` that takes a prop children.
// The children prop will be components or content nested within this DashboardLayout component.
const DashboardLayout = ({ children }) => {

    // The router object provides methods for programmatic navigation.
    const router = useRouter();

    // Defines a function handleBackClick that, when invoked, uses the router to navigate to the root path '/'.
    const handleBackClick = () => {
      router.push('/');
    };

    // Defines a function handleReadingListClick that, when invoked, navigates to the '/reading-list' path.
    const handleReadingListClick = () => {
        router.push('/reading-list');
    };

    // Defines a function handleAddBookClick that, when invoked, navigates to the '/add-book' path.
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
          {/* Dashboard Title */}
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
      {/* The main content (children) is wrapped in a Stack component with some styling for padding. */}
    </>
  );
};

export default DashboardLayout;
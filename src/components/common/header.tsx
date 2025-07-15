import { AppBar, Toolbar, Typography, Button, Box, InputBase, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import { styled, alpha } from '@mui/material/styles';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
      '&:focus': {
        width: '30ch',
      },
    },
  },
}));

const Header = ({ onBlogItClick }: { onBlogItClick: () => void }) => {
  const { user, logout } = useAuth();

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          color="inherit"
          component={Link}
          to="/"
          aria-label="home"
          sx={{ mr: 1 }}
          onClick={onBlogItClick}
        >
          <HomeIcon />
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={onBlogItClick}
        >         
            BlogIt
        </Typography>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
        {user ? (
          <Box sx={{ display: 'flex', gap: 2, ml: 2 }}>
            <Button color="inherit" component={Link} to="/blogs">
              Posts
            </Button>
            <Button color="inherit" component={Link} to="/new-blog">
              New Blog
            </Button>
            <Button color="inherit" component={Link} to="/profile">
              Profile
            </Button>
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', gap: 1, ml: 2 }}>
            <Button color="inherit" component={Link} to="/register">
              Sign Up
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;

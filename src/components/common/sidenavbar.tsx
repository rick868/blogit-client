import { Box, Avatar, Typography, List, ListItem, ListItemButton, ListItemText, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const SideNavbar = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <Box
      sx={{
        width: 200,
        height: '80vh',
        bgcolor: 'background.paper',
        borderRight: '1px solid #ddd',
        position: 'fixed',
        marginTop: '60px',
        top: 0,
        left: 0,
        pt: 2,
        px: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ width: 80, height: 80, mb: 1 }}>
        {user.firstName.charAt(0)}
        {user.lastName.charAt(0)}
      </Avatar>
      <Typography variant="h6" gutterBottom>
        {user.firstName} {user.lastName}
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        {user.emailAddress}
      </Typography>
      <Divider sx={{ width: '100%', mb: 2 }} />
      <List sx={{ width: '100%' }}>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/profile">
            <ListItemText primary="My Profile" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/blogs">
            <ListItemText primary="Manage Blogs" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/new-blog">
            <ListItemText primary="Create New Blog" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default SideNavbar;

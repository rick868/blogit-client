import { useEffect, useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import ProfileForm from '../../components/user/profileform';
import UserBlogs from '../../components/user/userblogs';
import api from '../../services/api';

const ProfilePage = () => {
  const [userBlogs, setUserBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserBlogs = async () => {
      try {
        const response = await api.get('/blogs/user');
        setUserBlogs(response.data);
      } catch (error) {
        console.error('Error fetching user blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserBlogs();
  }, []);

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        My Profile
      </Typography>
      
      <Box mb={4}>
        <Typography variant="h5" gutterBottom>
          Profile Information
        </Typography>
        <ProfileForm />
      </Box>

      <Box>
        {loading ? (
          <div>Loading your blogs...</div>
        ) : (
          <UserBlogs blogs={userBlogs} />
        )}
      </Box>
    </Container>
  );
};

export default ProfilePage;
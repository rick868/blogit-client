import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box } from '@mui/material';
import UserBlogs from '../../components/user/userblogs';
import api from '../../services/api';

interface UserProfile {
  firstName: string;
  lastName: string;
  emailAddress: string;
  profileImage?: string;
}

const UserProfilePage = () => {
  const { userId } = useParams<{ userId: string }>();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userBlogs, setUserBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfileAndBlogs = async () => {
      try {
        const profileResponse = await api.get(`/users/${userId}`);
        setUserProfile(profileResponse.data);

        const blogsResponse = await api.get(`/blogs/user/${userId}`);
        setUserBlogs(blogsResponse.data);
      } catch (error) {
        console.error('Error fetching user profile or blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserProfileAndBlogs();
    }
  }, [userId]);

  if (loading) {
    return <Container>Loading user profile...</Container>;
  }

  if (!userProfile) {
    return <Container>User not found.</Container>;
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        {userProfile.firstName} {userProfile.lastName}'s Profile
      </Typography>
      <Box mb={4}>
        <img
          src={userProfile.profileImage || '/placeholder.jpg'}
          alt={`${userProfile.firstName} ${userProfile.lastName}`}
          style={{ width: 150, height: 150, borderRadius: '50%' }}
        />
        <Typography variant="body1" gutterBottom>
          Email: {userProfile.emailAddress}
        </Typography>
      </Box>
      <Box>
        <Typography variant="h5" gutterBottom>
          Blogs
        </Typography>
        <UserBlogs blogs={userBlogs} />
      </Box>
    </Container>
  );
};

export default UserProfilePage;

import { Box, Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Footer from '../components/common/footer';

const HomePage = () => {
  const { user } = useAuth();

  return (
    <>
      <Container maxWidth={false} disableGutters sx={{ height: '100vh', width: '100vw', margin: 0, padding: 0 }}>      
        <Box sx={{
          height: "100vh",
          width: "100vw",
          background:"url(/background.jpeg)",
          backgroundPosition:"center",
          backgroundSize:"cover",
          backgroundRepeat:"no-repeat",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          color: "white",
          p: 4,
          borderRadius: 0,
        }}> 
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to the home of Bloggers.
          </Typography>
          <Typography variant="h5" component="p" gutterBottom>
            {user ? `Hello, ${user.firstName}! Ready to write your next blog post?` : 'Share your thoughts with the world'}
          </Typography>
          {user ? (
            <Button 
              variant="contained" 
              size="large" 
              component={Link} 
              to="/new-blog"
              sx={{ mt: 3 }}
            >
              Create New Blog
            </Button>
          ) : (
            <Button
              variant="contained"
              size="large"
              component={Link}
              to="/login"
              sx={{ mt: 3 }}
            >
              Start Blogging
            </Button>
          )}
        </Box>
      </Container>
      <Footer />
    </>
   );
};

export default HomePage;

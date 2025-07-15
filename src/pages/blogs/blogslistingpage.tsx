import { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import BlogList from '../../components/blogs/bloglist';
import api from '../../services/api';

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await api.get('/blogs');
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
          Blog Posts
      </Typography>
      <BlogList blogs={blogs} />
    </Container>
  );
};

export default BlogsPage;
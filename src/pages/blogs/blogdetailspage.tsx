import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Typography, Button, Box, Avatar } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import api from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

interface User {
  id: string;
  firstName : string,
  lastName: string,
}

interface BlogPost {
  id: string;
  title: string;
  user: User;
  featuredImage?: string;
  synopsis: string;
  content: string;
}

const BlogDetailPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await api.get(`/blogs/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching blog:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!post) return <div>Blog not found</div>;

  return (
    <Container>
      <Typography variant="h3" component="h1" gutterBottom>
        {post.title}
      </Typography>
      
      <Box display="flex" alignItems="center" mb={3}>
        <Avatar sx={{ mr: 2 }}>
          {post.user.firstName.charAt(0)}{post.user.lastName.charAt(0)}
        </Avatar>
        <Typography>
          By {post.user.firstName} {post.user.lastName}
        </Typography>
      </Box>

      {post.featuredImage && (
        <img 
          src={post.featuredImage} 
          alt={post.title} 
          style={{ maxWidth: '100%', marginBottom: '1rem' }} 
        />
      )}

      <Typography variant="subtitle1" gutterBottom>
        {post.synopsis}
      </Typography>

      <ReactMarkdown>{post.content}</ReactMarkdown>

      {user?.id === post.user.id && (
        <Box mt={3}>
          <Button 
            variant="contained" 
            component={Link} 
            to={`/blogs/${id}/edit`}
            sx={{ mr: 2 }}
          >
            Edit
          </Button>
          <Button 
            variant="outlined" 
            color="error"
            onClick={async () => {
              if (window.confirm('Are you sure you want to delete this blog?')) {
                try {
                  await api.delete(`/blogs/${id}`);
                  alert('Blog deleted successfully');
                  window.location.href = '/blogs';
                } catch (error) {
                  console.error('Error deleting blog:', error);
                  alert('Failed to delete blog');
                }
              }
            }}
          >
            Delete
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default BlogDetailPage;

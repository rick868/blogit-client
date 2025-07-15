import { useNavigate } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import BlogEditor from '../../components/blogs/blogeditor';
import api from '../../services/api';

const BlogNewPage = () => {
  const navigate = useNavigate();

  interface BlogFormData {
    title: string;
    synopsis: string;
    content: string;
    featuredImage?: string;
  }

  const handleSubmit = async (formData: BlogFormData) => {
    try {
      const response = await api.post('/blogs', formData);
      navigate(`/blogs/${response.data.id}`);
    } catch (error) {
      console.error('Error creating blog:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Create Blog
      </Typography>
      <BlogEditor onSubmit={handleSubmit} />
    </Container>
  );
};

export default BlogNewPage;
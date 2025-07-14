import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import BlogEditor from '../../components/blogs/blogeditor';
import api from '../../services/api';

const BlogEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await api.get(`/blogs/${id}`);
        setBlog(response.data);
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };

    fetchBlog();
  }, [id]);

  interface BlogFormData {
    title: string;
    synopsis: string;
    content: string;
    featuredImage?: string;
  }

  const handleSubmit = async (formData: BlogFormData) => {
    try {
      await api.patch(`/blogs/${id}`, formData);
      navigate(`/blogs/${id}`);
    } catch (error) {
      console.error('Error updating blog:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Edit Blog Post
      </Typography>
      {blog ? (
        <BlogEditor initialData={blog} onSubmit={handleSubmit} />
      ) : (
        <div>Loading...</div>
      )}
    </Container>
  );
};

export default BlogEditPage;
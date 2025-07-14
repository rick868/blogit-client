import { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

interface BlogEditorProps {
  initialData?: {
    title: string;
    synopsis: string;
    content: string;
    featuredImage: string;
  };
  onSubmit: (data: {
    title: string;
    synopsis: string;
    content: string;
    featuredImage: string;
  }) => void;
}

const BlogEditor = ({ initialData, onSubmit }: BlogEditorProps) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    synopsis: initialData?.synopsis || '',
    content: initialData?.content || '',
    featuredImage: initialData?.featuredImage || ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        name="title"
        label="Title"
        fullWidth
        margin="normal"
        value={formData.title}
        onChange={handleChange}
      />
      <TextField
        name="featuredImage"
        label="Featured Image URL"
        fullWidth
        margin="normal"
        value={formData.featuredImage}
        onChange={handleChange}
      />
      <TextField
        name="synopsis"
        label="Synopsis"
        fullWidth
        margin="normal"
        multiline
        rows={3}
        value={formData.synopsis}
        onChange={handleChange}
      />
      <TextField
        name="content"
        label="Content"
        fullWidth
        margin="normal"
        multiline
        rows={10}
        value={formData.content}
        onChange={handleChange}
      />
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Submit
      </Button>
    </Box>
  );
};

export default BlogEditor;
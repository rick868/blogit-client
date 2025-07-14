import { Grid, Box } from '@mui/material';
import BlogCard from './BlogCard';
import { Blog } from '../../types';

interface BlogListProps {
  blogs: Blog[];
}

const BlogList = ({ blogs }: BlogListProps) => {
  return (
    <Grid container spacing={2}>
      {blogs.map((blog) => (
        <Box
         key={blog.id} xs={12} sm={6} md={4}>
          <BlogCard {...blog} />
        </Box>
      ))}
    </Grid>
  );
};

export default BlogList;
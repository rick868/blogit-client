import { Grid, Box } from '@mui/material';
import BlogCard from './blogcard';
import type { Blog } from '../../types';

interface BlogListProps {
  blogs: Blog[];
}

const BlogList = ({ blogs }: BlogListProps) => {
  return (
    <Grid container spacing={2}>
      {blogs.map((blog) => (
        <Box
         key={blog.id} sx={{ display: 'flex',
                             flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center' }}>
          <BlogCard {...blog} />
        </Box>
      ))}
    </Grid>
  );
};

export default BlogList;

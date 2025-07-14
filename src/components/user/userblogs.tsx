import { Typography } from '@mui/material';
import BlogList from '../blogs/bloglist';
import type { Blog } from '../../types';

interface UserBlogsProps {
  blogs: Blog[];
}

const UserBlogs = ({ blogs }: UserBlogsProps) => {
  return (
    <div>
      <Typography variant="h5" gutterBottom>
        My Blogs
      </Typography>
      <BlogList blogs={blogs} />
    </div>
  );
};

export default UserBlogs;

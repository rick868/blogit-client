import { Card, CardContent, Typography, CardMedia, Avatar, Box } from '@mui/material';
import { Link } from 'react-router-dom';

interface BlogCardProps {
  id: string;
  title: string;
  synopsis: string;
  featuredImage: string;
  user?: {
    firstName: string;
    lastName: string;
  };
}

const BlogCard = ({ id, title, synopsis, featuredImage, user }: BlogCardProps) => {
  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      <CardMedia
        component="img"
        height="140"
        image={featuredImage || '/placeholder.jpg'}
        alt={title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {synopsis}
        </Typography>
        {user && (
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
            <Avatar sx={{ mr: 1 }}>
              {user.firstName.charAt(0)}{user.lastName.charAt(0)}
            </Avatar>
            <Typography variant="body2">
              {user.firstName} {user.lastName}
            </Typography>
          </Box>
        )}
        <Link to={`/blogs/${id}`}>Read More</Link>
      </CardContent>
    </Card>
  );
};

export default BlogCard;

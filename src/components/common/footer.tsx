import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
        textAlign: 'center',
      }}
    >
      <Typography variant="body2" color="text.secondary">
        {'© '}
        <Link color="inherit" href="https://blogit-client-7faq.vercel.app/">
          BlogIt
        </Link>{' '}
        {new Date().getFullYear()}
        {'. All rights reserved.'}
      </Typography>
    </Box>
  );
};

export default Footer;

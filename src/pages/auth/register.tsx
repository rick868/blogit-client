import { Container, Paper, Typography } from '@mui/material';
import RegisterForm from '../../components/auth/registerform';

const RegisterPage = () => {
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Register
        </Typography>
        <RegisterForm />
      </Paper>
    </Container>
  );
};

export default RegisterPage;
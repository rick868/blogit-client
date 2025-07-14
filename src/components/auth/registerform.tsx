import { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface RegisterFormData {
  firstName: string;
  lastName: string;
  userName: string;
  emailAddress: string;
  password: string;
}

const RegisterForm = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: '',
    lastName: '',
    userName: '',
    emailAddress: '',
    password: ''
  });
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(formData);
      navigate('/login');
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          name="firstName"
          label="First Name"
          fullWidth
          margin="normal"
          value={formData.firstName}
          onChange={handleChange}
        />
        <TextField
          name="lastName"
          label="Last Name"
          fullWidth
          margin="normal"
          value={formData.lastName}
          onChange={handleChange}
        />
        <TextField
          name="userName"
          label="User Name"
          fullWidth
          margin="normal"
          value={formData.userName}
          onChange={handleChange}
        />
        <TextField
          name="emailAddress"
          label="Email Address"
          type="email"
          fullWidth
          margin="normal"
          value={formData.emailAddress}
          onChange={handleChange}
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={formData.password}
          onChange={handleChange}
        />
        <TextField
          name="confirmpassword"
          label="Confirm Password"
          type="password"
          fullWidth
          margin="normal"
          value={formData.password}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Register
        </Button>
      </Box>
      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <a href="/login" style={{ color: '#1976d2', textDecoration: 'underline', cursor: 'pointer' }}>
          Already have an account? Login here
        </a>
      </Box>
    </>
  );
};

export default RegisterForm;

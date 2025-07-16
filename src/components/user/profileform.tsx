import { useState } from 'react';
import { TextField, Button, Box, CircularProgress } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';

const ProfileForm = () => {
  const { user, setUser } = useAuth();
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    userName: user?.userName || '',
    emailAddress: user?.emailAddress || '',
    profileImage: user?.profileImage || '',
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploading(true);
      setError(null);
      try {
        const file = e.target.files[0];
        const formDataUpload = new FormData();
        formDataUpload.append('image', file);

        const response = await api.post('/api/upload/image', formDataUpload, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        setFormData((prev) => ({ ...prev, profileImage: response.data.imageUrl }));
        setSuccess('Image uploaded successfully');
      } catch (err) {
        setError('Failed to upload image');
        console.error('Image upload error:', err);
      } finally {
        setUploading(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      const response = await api.put('/users/profile', formData);
      setUser(response.data);
      setSuccess('Profile updated successfully');
    } catch (err) {
      setError('Failed to update profile');
      console.error('Profile update error:', err);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
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
        label="Email"
        fullWidth
        margin="normal"
        value={formData.emailAddress}
        onChange={handleChange}
      />
      <Box sx={{ mt: 2 }}>
        <input
          accept="image/*"
          type="file"
          onChange={handleFileChange}
          disabled={uploading}
        />
        {uploading && <CircularProgress size={24} sx={{ ml: 2 }} />}
        {formData.profileImage && (
          <Box sx={{ mt: 2 }}>
            <img src={formData.profileImage} alt="Profile" style={{ maxWidth: '100%', maxHeight: 200 }} />
          </Box>
        )}
      </Box>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>{success}</div>}
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Update Profile
      </Button>
    </Box>
  );
};

export default ProfileForm;

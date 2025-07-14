import { CircularProgress } from '@mui/material';

const LoadingSpinner = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
      <CircularProgress />
    </div>
  );
};

export default LoadingSpinner;
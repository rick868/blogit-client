import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/common/header';
import HomePage from './pages/homepage';
import LoginPage from './pages/auth/login';
import RegisterPage from './pages/auth/register';
import BlogsPage from './pages/blogs/blogslistingpage';
import BlogDetailPage from './pages/blogs/blogdetailspage';
import BlogNewPage from './pages/blogs/blognewpage';
import BlogEditPage from './pages/blogs/blogeditpage';
import ProfilePage from './pages/user/profilepage';
import ProtectedRoute from './components/common/protectedroute';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AuthProvider>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/blogs/:id" element={<BlogDetailPage />} />
            
            <Route path="/new-blog" element={
              <ProtectedRoute>
                <BlogNewPage />
              </ProtectedRoute>
            } />
            <Route path="/blogs/:id/edit" element={
              <ProtectedRoute>
                <BlogEditPage />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
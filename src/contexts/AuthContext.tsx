import { createContext, useState, useEffect, useMemo, useContext, useCallback } from 'react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  emailAddress: string;
}

interface RegisterFormData {
  firstName: string;
  lastName: string;
  userName: string;
  emailAddress: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  login: (emailAddressOrUserName: string, password: string) => Promise<void>;
  register: (formData: RegisterFormData) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}



export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.get('/user')
        .then(response => setUser(response.data))
        .catch(() => setUser(null));
    }
  }, []);

  const login = useCallback(async (emailAddressOrUserName: string, password: string) => {
    const response = await api.post('/auth/login', { emailAddressOrUserName, password });
    setUser(response.data.user);
    localStorage.setItem('token', response.data.token);
    navigate('/blogs');
  }, [navigate]);

  const register = useCallback(async (formData: RegisterFormData) => {
    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      userName: formData.userName,
      emailAddress: formData.emailAddress,
      password: formData.password,
    };
    const response = await api.post('/auth/register', payload);
    setUser(response.data.user);
    localStorage.setItem('token', response.data.token);
    navigate('/blogs');
  }, [navigate]);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('token');
    navigate('/login');
  }, [navigate]);

  return (
    <AuthContext.Provider value={useMemo(() => ({ user, login, register, logout }), [user, login, register, logout])}>
      {children}
    </AuthContext.Provider>
  );
};

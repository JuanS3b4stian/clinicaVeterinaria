import { createContext, useContext, useEffect, useState } from 'react';
import axiosClient from '../config/axiosClient.js';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  const login = (veterinary) => {
    localStorage.setItem('token', veterinary.token);
    axiosClient.defaults.headers.common.Authorization = `Bearer ${veterinary.token}`;
    setAuth(veterinary);
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axiosClient.defaults.headers.common.Authorization;
    setAuth(null);
  };

  useEffect(() => {
    const authenticateUser = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setLoadingAuth(false);
        return;
      }

      axiosClient.defaults.headers.common.Authorization = `Bearer ${token}`;

      try {
        const { data } = await axiosClient.get('/veterinarios/profile');
        setAuth({ ...data, token });
      } catch (error) {
        logout();
      } finally {
        setLoadingAuth(false);
      }
    };

    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth: login, login, logout, loadingAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
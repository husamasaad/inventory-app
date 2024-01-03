import React, { useContext } from 'react';

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  // Assume you have a state variable to store the token
  const [token, setToken] = React.useState(sessionStorage.getItem('token'));

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ isAuthenticated, setToken, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
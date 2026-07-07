import { createContext, useContext, useState, useEffect } from 'react';
import pb from '../lib/pb';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(pb.authStore.model);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial check
    setUser(pb.authStore.model);
    setLoading(false);

    // Subscribe to PocketBase auth state changes
    const unsubscribe = pb.authStore.onChange((token, model) => {
      setUser(model);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const login = async (email, password) => {
    try {
      const authData = await pb.collection('users').authWithPassword(email, password);
      return true;
    } catch (error) {
      console.error('Login error', error);
      throw new Error(error.message || 'Login failed');
    }
  };

  const register = async (name, email, password, role) => {
    try {
      const record = await pb.collection('users').create({
        email,
        password,
        passwordConfirm: password,
        name,
        role
      });
      return await login(email, password);
    } catch (error) {
      console.error('Registration error', error);
      throw new Error(error.message || 'Registration failed');
    }
  };

  const logout = () => {
    pb.authStore.clear();
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
  avatar?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    role: string
  ) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  loading: true,
  error: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  // Set axios defaults
  axios.defaults.baseURL = API_URL;

  // Load user from localStorage on initial load
  useEffect(() => {
    const loadUser = async () => {
      if (localStorage.token) {
        setAuthToken(localStorage.token);
        try {
          const res = await axios.get("/auth/me");
          setUser(res.data.user);
          setIsAuthenticated(true);
        } catch (err) {
          localStorage.removeItem("token");
          setUser(null);
          setIsAuthenticated(false);
          setError("Session expired. Please login again.");
        }
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  // Set auth token for axios requests
  const setAuthToken = (token: string) => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  // Login user
  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post("/auth/login", { email, password });

      // Set token in localStorage
      localStorage.setItem("token", res.data.token);

      // Set auth token in axios headers
      setAuthToken(res.data.token);

      // Set user state
      setUser(res.data.user);
      setIsAuthenticated(true);
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
      setIsAuthenticated(false);
      localStorage.removeItem("token");
    }
    setLoading(false);
  };

  // Register user
  const register = async (
    name: string,
    email: string,
    password: string,
    role: string
  ) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post("/auth/register", {
        name,
        email,
        password,
        role,
      });

      // Set token in localStorage
      localStorage.setItem("token", res.data.token);

      // Set auth token in axios headers
      setAuthToken(res.data.token);

      // Set user state
      setUser(res.data.user);
      setIsAuthenticated(true);
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
      setIsAuthenticated(false);
    }
    setLoading(false);
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem("token");
    setAuthToken("");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        error,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

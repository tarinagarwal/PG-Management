import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layouts
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Pages
import Home from './pages/Home';
import Properties from './pages/Properties';
import PropertyDetails from './pages/PropertyDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import MyProperties from './pages/MyProperties';
import MyBookings from './pages/MyBookings';
import AddProperty from './pages/AddProperty';
import EditProperty from './pages/EditProperty';
import NotFound from './pages/NotFound';

// Context
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="properties" element={<Properties />} />
            <Route path="properties/:id" element={<PropertyDetails />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          
          {/* Protected Dashboard routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="my-properties" element={<MyProperties />} />
            <Route path="my-bookings" element={<MyBookings />} />
            <Route path="add-property" element={<AddProperty />} />
            <Route path="edit-property/:id" element={<EditProperty />} />
          </Route>
          
          {/* 404 route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
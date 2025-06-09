import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, User, Building, Calendar, Plus, Settings, Users, BarChart } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const linkClasses = (path: string) => {
    return `flex items-center px-4 py-3 ${
      isActive(path)
        ? 'bg-teal-600 text-white'
        : 'text-gray-600 hover:bg-teal-50 hover:text-teal-600'
    } rounded-lg transition-colors duration-200`;
  };

  return (
    <div className="hidden md:flex md:flex-col w-64 bg-white border-r border-gray-200">
      <div className="p-4">
        <div className="flex items-center justify-center p-2 mb-6">
          <div className="h-12 w-12 rounded-full bg-teal-100 flex items-center justify-center">
            <User className="h-6 w-6 text-teal-600" />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700">{user?.name}</p>
            <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
          </div>
        </div>

        <nav className="space-y-1">
          <Link to="/dashboard" className={linkClasses('/dashboard')}>
            <BarChart className="mr-3 h-5 w-5" />
            Dashboard
          </Link>
          
          <Link to="/dashboard/profile" className={linkClasses('/dashboard/profile')}>
            <User className="mr-3 h-5 w-5" />
            Profile
          </Link>
          
          <Link to="/dashboard/my-bookings" className={linkClasses('/dashboard/my-bookings')}>
            <Calendar className="mr-3 h-5 w-5" />
            My Bookings
          </Link>
          
          {/* Show only for property owners and admins */}
          {(user?.role === 'owner' || user?.role === 'admin') && (
            <>
              <Link to="/dashboard/my-properties" className={linkClasses('/dashboard/my-properties')}>
                <Building className="mr-3 h-5 w-5" />
                My Properties
              </Link>
              
              <Link to="/dashboard/add-property" className={linkClasses('/dashboard/add-property')}>
                <Plus className="mr-3 h-5 w-5" />
                Add Property
              </Link>
            </>
          )}
          
          {/* Admin only menu items */}
          {user?.role === 'admin' && (
            <Link to="/dashboard/manage-users" className={linkClasses('/dashboard/manage-users')}>
              <Users className="mr-3 h-5 w-5" />
              Manage Users
            </Link>
          )}
          
          <Link to="/dashboard/settings" className={linkClasses('/dashboard/settings')}>
            <Settings className="mr-3 h-5 w-5" />
            Settings
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Home, LogIn, UserPlus, User, LogOut } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-teal-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Home className="h-8 w-8 text-white" />
              <span className="ml-2 text-xl font-bold text-white">PG Finder</span>
            </Link>
          </div>
          
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link to="/" className="text-white hover:bg-teal-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Home
            </Link>
            <Link to="/properties" className="text-white hover:bg-teal-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Properties
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-white hover:bg-teal-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Dashboard
                </Link>
                <div className="relative ml-3">
                  <div className="flex items-center">
                    <button
                      type="button"
                      className="text-white group flex items-center hover:bg-teal-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-5 w-5 mr-1" />
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-white hover:bg-teal-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  <div className="flex items-center">
                    <LogIn className="h-5 w-5 mr-1" />
                    Login
                  </div>
                </Link>
                <Link to="/register" className="bg-white text-teal-600 hover:bg-teal-100 px-3 py-2 rounded-md text-sm font-medium">
                  <div className="flex items-center">
                    <UserPlus className="h-5 w-5 mr-1" />
                    Register
                  </div>
                </Link>
              </>
            )}
          </div>
          
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="bg-teal-600 inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-teal-700 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        className={`${isOpen ? 'block' : 'hidden'} md:hidden`} 
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link 
            to="/" 
            className="text-white hover:bg-teal-700 block px-3 py-2 rounded-md text-base font-medium"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/properties" 
            className="text-white hover:bg-teal-700 block px-3 py-2 rounded-md text-base font-medium"
            onClick={() => setIsOpen(false)}
          >
            Properties
          </Link>
          
          {isAuthenticated ? (
            <>
              <Link 
                to="/dashboard" 
                className="text-white hover:bg-teal-700 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="text-white hover:bg-teal-700 w-full text-left block px-3 py-2 rounded-md text-base font-medium"
              >
                <div className="flex items-center">
                  <LogOut className="h-5 w-5 mr-1" />
                  Logout
                </div>
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="text-white hover:bg-teal-700 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center">
                  <LogIn className="h-5 w-5 mr-1" />
                  Login
                </div>
              </Link>
              <Link 
                to="/register" 
                className="text-white hover:bg-teal-700 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center">
                  <UserPlus className="h-5 w-5 mr-1" />
                  Register
                </div>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
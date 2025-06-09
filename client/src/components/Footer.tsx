import React from 'react';
import { Home, Mail, Phone, Instagram, Facebook, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="mb-8 md:mb-0">
            <Link to="/" className="flex items-center mb-4">
              <Home className="h-8 w-8 text-teal-400" />
              <span className="ml-2 text-xl font-bold">PG Finder</span>
            </Link>
            <p className="text-gray-300 mb-4">
              Finding the perfect PG accommodation made simple and hassle-free.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-teal-400">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-teal-400">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-teal-400">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-teal-400">Home</Link></li>
              <li><Link to="/properties" className="text-gray-300 hover:text-teal-400">Properties</Link></li>
              <li><Link to="/login" className="text-gray-300 hover:text-teal-400">Login</Link></li>
              <li><Link to="/register" className="text-gray-300 hover:text-teal-400">Register</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Discover</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-teal-400">PG in Delhi</a></li>
              <li><a href="#" className="text-gray-300 hover:text-teal-400">PG in Mumbai</a></li>
              <li><a href="#" className="text-gray-300 hover:text-teal-400">PG in Bangalore</a></li>
              <li><a href="#" className="text-gray-300 hover:text-teal-400">PG in Hyderabad</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <p className="flex items-center text-gray-300">
                <Mail className="h-5 w-5 mr-2 text-teal-400" />
                info@pgfinder.com
              </p>
              <p className="flex items-center text-gray-300">
                <Phone className="h-5 w-5 mr-2 text-teal-400" />
                +91 987 654 3210
              </p>
              <p className="flex items-start text-gray-300">
                <Home className="h-5 w-5 mr-2 mt-1 text-teal-400" />
                <span>123 Tech Park, Sector 15<br />Gurgaon, Haryana 122001</span>
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} PG Finder. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
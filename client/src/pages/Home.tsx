import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, ArrowRight } from 'lucide-react';
import axios from 'axios';
import PropertyCard from '../components/PropertyCard';

const Home: React.FC = () => {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        const response = await axios.get('/properties?limit=6');
        setFeaturedProperties(response.data.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProperties();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to properties page with search query
    window.location.href = `/properties?search=${searchQuery}`;
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-teal-600 to-teal-800 text-white">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Perfect PG Accommodation</h1>
            <p className="text-xl mb-8">Discover comfortable, affordable, and convenient PG accommodations that feel like home.</p>
            
            {/* Search Form */}
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 p-2 bg-white rounded-lg shadow-lg">
              <div className="flex-1 flex items-center relative border-b sm:border-b-0 sm:border-r border-gray-200 px-3 py-2">
                <MapPin className="h-5 w-5 text-gray-400" />
                <input 
                  type="text" 
                  className="w-full pl-2 pr-4 py-1 text-gray-800 focus:outline-none" 
                  placeholder="Search by location, property name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button 
                type="submit" 
                className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-md transition duration-200 flex items-center justify-center"
              >
                <Search className="h-5 w-5 mr-2" />
                Search
              </button>
            </form>
            
            <div className="mt-4 flex flex-wrap gap-3">
              <span className="bg-white bg-opacity-20 rounded-full px-3 py-1 text-sm">Delhi</span>
              <span className="bg-white bg-opacity-20 rounded-full px-3 py-1 text-sm">Mumbai</span>
              <span className="bg-white bg-opacity-20 rounded-full px-3 py-1 text-sm">Bangalore</span>
              <span className="bg-white bg-opacity-20 rounded-full px-3 py-1 text-sm">Hyderabad</span>
              <span className="bg-white bg-opacity-20 rounded-full px-3 py-1 text-sm">Pune</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Properties */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Featured PG Accommodations</h2>
            <Link to="/properties" className="text-teal-600 hover:text-teal-700 flex items-center">
              View all 
              <ArrowRight className="ml-1 h-5 w-5" />
            </Link>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProperties.map((property: any) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Finding your perfect PG accommodation is easy with our simple process.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="h-14 w-14 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-7 w-7 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Search PGs</h3>
              <p className="text-gray-600">Explore our extensive listing of PGs with detailed information and real photos.</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="h-14 w-14 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="h-7 w-7 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Book a Visit</h3>
              <p className="text-gray-600">Schedule a visit to your preferred PGs or directly book online.</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="h-14 w-14 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ArrowRight className="h-7 w-7 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Move In</h3>
              <p className="text-gray-600">Complete the booking process and move into your new PG accommodation.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Don't take our word for it, hear from our satisfied users.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center mr-4">
                  <span className="text-amber-600 font-bold">AR</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Arjun Reddy</h4>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">"Found an amazing PG through this platform. The booking process was smooth and the PG turned out to be exactly as shown in the pictures. Highly recommended!"</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center mr-4">
                  <span className="text-amber-600 font-bold">PK</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Priya Kumar</h4>
                  <div className="flex text-amber-400">
                    {[...Array(4)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                    <span className="text-gray-300">★</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">"As a student, I was worried about finding a safe and affordable PG. This website made it so easy! Found a great place near my college within my budget."</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center mr-4">
                  <span className="text-amber-600 font-bold">RG</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Rahul Gupta</h4>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">"I've listed my properties on this platform and the response has been amazing. The interface is user-friendly and I get genuine inquiries. It's a win-win for owners and seekers!"</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-20 bg-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Find Your Perfect PG?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">Join thousands of satisfied users who found their ideal PG accommodation through our platform.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/properties" className="bg-white text-teal-600 hover:bg-teal-50 font-bold py-3 px-8 rounded-lg transition duration-200">
              Browse Properties
            </Link>
            <Link to="/register" className="bg-transparent hover:bg-teal-700 border-2 border-white font-bold py-3 px-8 rounded-lg transition duration-200">
              Join Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
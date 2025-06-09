import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropertyCard from '../components/PropertyCard';
import { Search, MapPin, Filter } from 'lucide-react';

const Properties: React.FC = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    city: '',
    propertyType: '',
    gender: '',
    priceRange: '',
    roomType: ''
  });

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('/properties');
        setProperties(response.data.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center bg-white p-4 rounded-lg shadow-sm">
          <div className="flex-1 w-full">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by location, property name..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            <select
              name="propertyType"
              value={filters.propertyType}
              onChange={handleFilterChange}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="">Property Type</option>
              <option value="PG">PG</option>
              <option value="Hostel">Hostel</option>
              <option value="Apartment">Apartment</option>
            </select>
            
            <select
              name="gender"
              value={filters.gender}
              onChange={handleFilterChange}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="">Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Unisex">Unisex</option>
            </select>
            
            <select
              name="priceRange"
              value={filters.priceRange}
              onChange={handleFilterChange}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="">Price Range</option>
              <option value="0-5000">Under ₹5,000</option>
              <option value="5000-10000">₹5,000 - ₹10,000</option>
              <option value="10000-15000">₹10,000 - ₹15,000</option>
              <option value="15000+">Above ₹15,000</option>
            </select>
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property: any) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Properties;
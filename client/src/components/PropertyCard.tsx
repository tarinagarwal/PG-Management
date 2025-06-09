import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Home } from 'lucide-react';

interface PropertyCardProps {
  property: {
    _id: string;
    title: string;
    address: {
      city: string;
      state: string;
    };
    price: number;
    photos: string[];
    propertyType: string;
    roomType: string;
    gender: string;
    available: boolean;
    amenities: string[];
  };
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <Link 
      to={`/properties/${property._id}`}
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <div className="relative">
        <img 
          src={property.photos[0]} 
          alt={property.title} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-0 right-0 bg-teal-500 text-white text-xs font-bold px-2 py-1 m-2 rounded">
          {property.propertyType}
        </div>
        <div className={`absolute bottom-0 left-0 text-white text-xs font-bold px-2 py-1 m-2 rounded ${property.available ? 'bg-green-500' : 'bg-red-500'}`}>
          {property.available ? 'Available' : 'Not Available'}
        </div>
      </div>
      
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-1">{property.title}</h2>
        <p className="flex items-center text-gray-600 text-sm mb-2">
          <MapPin className="h-4 w-4 mr-1 text-teal-500" />
          {property.address.city}, {property.address.state}
        </p>
        
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center space-x-3">
            <span className="flex items-center text-xs bg-gray-100 px-2 py-1 rounded">
              <Home className="h-3 w-3 mr-1" />
              {property.roomType}
            </span>
            <span className="flex items-center text-xs bg-gray-100 px-2 py-1 rounded">
              {property.gender}
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <p className="text-teal-600 font-bold">
            ₹{property.price.toLocaleString()}<span className="text-gray-500 text-xs font-normal">/month</span>
          </p>
          <button className="bg-teal-500 hover:bg-teal-600 text-white text-sm py-1 px-3 rounded-md transition duration-200">
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
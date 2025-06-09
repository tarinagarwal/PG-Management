import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MapPin, Phone, Mail, Calendar, Check, X } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const PropertyDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useContext(AuthContext);
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [bookingDate, setBookingDate] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`/properties/${id}`);
        setProperty(response.data.data);
      } catch (error) {
        console.error('Error fetching property:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      await axios.post('/bookings', {
        property: id,
        checkInDate: bookingDate,
        message
      });
      
      navigate('/dashboard/my-bookings');
    } catch (error) {
      console.error('Error creating booking:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Property not found</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          <img
            src={property.photos[0]}
            alt={property.title}
            className="w-full h-96 object-cover rounded-lg"
          />
          <div className="grid grid-cols-2 gap-4">
            {property.photos.slice(1, 5).map((photo: string, index: number) => (
              <img
                key={index}
                src={photo}
                alt={`${property.title} - ${index + 2}`}
                className="w-full h-44 object-cover rounded-lg"
              />
            ))}
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
              <p className="flex items-center text-gray-600 mb-4">
                <MapPin className="h-5 w-5 mr-2 text-teal-600" />
                {property.address.street}, {property.address.city}, {property.address.state}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm">
                  {property.propertyType}
                </span>
                <span className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm">
                  {property.roomType}
                </span>
                <span className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm">
                  {property.gender}
                </span>
              </div>
            </div>
            
            <div className="md:text-right">
              <p className="text-3xl font-bold text-teal-600">₹{property.price.toLocaleString()}</p>
              <p className="text-gray-600">per month</p>
            </div>
          </div>

          <hr className="my-6" />

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p className="text-gray-600">{property.description}</p>
          </div>

          {/* Amenities */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {property.amenities.map((amenity: string, index: number) => (
                <div key={index} className="flex items-center">
                  <Check className="h-5 w-5 text-teal-600 mr-2" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Rules */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">House Rules</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {property.rules.map((rule: string, index: number) => (
                <div key={index} className="flex items-center">
                  <Check className="h-5 w-5 text-teal-600 mr-2" />
                  <span>{rule}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Owner Info */}
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold mb-4">Contact Owner</h2>
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 rounded-full bg-teal-100 flex items-center justify-center mr-4">
                <span className="text-teal-600 font-bold">
                  {property.owner.name.charAt(0)}
                </span>
              </div>
              <div>
                <h3 className="font-semibold">{property.owner.name}</h3>
                <p className="text-gray-600">Property Owner</p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="flex items-center text-gray-600">
                <Phone className="h-5 w-5 mr-2 text-teal-600" />
                {property.owner.phone}
              </p>
              <p className="flex items-center text-gray-600">
                <Mail className="h-5 w-5 mr-2 text-teal-600" />
                {property.owner.email}
              </p>
            </div>
          </div>

          {/* Booking Form */}
          {isAuthenticated && user?.role === 'finder' && property.available && (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Book This Property</h2>
              <form onSubmit={handleBooking} className="space-y-4">
                <div>
                  <label htmlFor="checkInDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Move-in Date
                  </label>
                  <input
                    type="date"
                    id="checkInDate"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message to Owner
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                    placeholder="Introduce yourself and ask any questions you have..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                >
                  Request Booking
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;